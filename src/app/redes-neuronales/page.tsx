import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function RedesNeuronales() {
  return (
    <div className="container">
      <h1>🧠 Redes Neuronales desde Cero</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        Para entender realmente cómo funcionan las redes neuronales, debes construirlas 
        desde cero. Aquí implementaremos neuronas, capas y el algoritmo de backpropagation 
        utilizando solo PyTorch para operaciones tensoriales.
      </p>

      {/* Tabla de Contenidos */}
      <div className="toc">
        <div className="toc-title">📑 Contenido</div>
        <ul className="toc-list">
          <li className="toc-item"><a href="#neurona">1. La Neurona Artificial</a></li>
          <li className="toc-item"><a href="#capa">2. Construyendo una Capa</a></li>
          <li className="toc-item"><a href="#activacion">3. Funciones de Activación</a></li>
          <li className="toc-item"><a href="#backprop">4. Backpropagation</a></li>
          <li className="toc-item"><a href="#training">5. Loop de Entrenamiento</a></li>
        </ul>
      </div>

      {/* Sección 1: La Neurona Artificial */}
      <section id="neurona" className="section">
        <h2>1. La Neurona Artificial</h2>
        
        <div className="concept-box">
          <div className="concept-title">💡 Anatomía de una Neurona</div>
          <p style={{ margin: 0 }}>
            Una neurona toma <strong>entradas</strong> (x), las multiplica por <strong>pesos</strong> (w), 
            añade un <strong>sesgo</strong> (b), y pasa el resultado por una <strong>función de activación</strong>.
            <br/><br/>
            Ecuación: <span className="math-inline">y = activation(x · w + b)</span>
          </p>
        </div>

        <CodeBlock
          title="neurona.py"
          code={`import torch
import torch.nn as nn

class Neuron:
    def __init__(self, n_inputs):
        # Inicializar pesos aleatorios y sesgo en cero
        # n_inputs: número de conexiones entrantes
        self.weights = torch.randn(n_inputs)
        self.bias = torch.randn(1)
        
    def forward(self, inputs):
        # 1. Producto punto (suma ponderada)
        # z = w1*x1 + w2*x2 + ... + b
        z = torch.dot(inputs, self.weights) + self.bias
        
        # 2. Función de activación (ReLU)
        # Si z > 0, devuelve z. Si z <= 0, devuelve 0.
        output = torch.max(torch.tensor(0.0), z)
        return output

# Ejemplo de uso
neuron = Neuron(n_inputs=3)
x = torch.tensor([1.0, 2.0, 3.0])
output = neuron.forward(x)

print(f"Entrada: {x}")
print(f"Pesos: {neuron.weights}")
print(f"Sesgo: {neuron.bias}")
print(f"Salida: {output.item():.4f}")`}
        />
      </section>

      {/* Sección 2: Construyendo una Capa */}
      <section id="capa" className="section">
        <h2>2. Construyendo una Capa (Layer)</h2>
        
        <p>
          Una capa densa (o fully connected) es simplemente un conjunto de neuronas que 
          procesan la misma entrada. En la práctica, implementamos esto usando multiplicación 
          matricial para eficiencia.
        </p>

        <CodeBlock
          title="capa_densa.py"
          code={`class LinearLayer:
    def __init__(self, n_inputs, n_neurons):
        # Matriz de pesos: (n_inputs, n_neurons)
        # Cada columna representa los pesos de una neurona
        self.weights = 0.01 * torch.randn(n_inputs, n_neurons)
        self.bias = torch.zeros(1, n_neurons)
        
    def forward(self, inputs):
        # inputs shape: (batch_size, n_inputs)
        # output = inputs @ weights + bias
        self.output = torch.matmul(inputs, self.weights) + self.bias
        return self.output

# Crear una capa con 4 entradas y 3 neuronas
layer = LinearLayer(n_inputs=4, n_neurons=3)

# Batch de 2 ejemplos
inputs = torch.randn(2, 4)
output = layer.forward(inputs)

print("Inputs shape:", inputs.shape)   # (2, 4)
print("Weights shape:", layer.weights.shape) # (4, 3)
print("Output shape:", output.shape)   # (2, 3)`}
        />
      </section>

      {/* Sección 3: Funciones de Activación */}
      <section id="activacion" className="section">
        <h2>3. Funciones de Activación</h2>
        
        <p>
          Sin funciones de activación no lineales, una red neuronal (sin importar cuántas capas tenga) 
          sería equivalente a una sola capa lineal. La no linealidad le permite aprender patrones complejos.
        </p>

        <h3>3.1 ReLU (Rectified Linear Unit)</h3>
        <p>La más popular para capas ocultas. Simple y efectiva.</p>
        <CodeBlock
          title="relu.py"
          code={`class ReLU:
    def forward(self, inputs):
        # Guardamos inputs para backpropagation
        self.inputs = inputs
        # max(0, x)
        return torch.maximum(torch.zeros_like(inputs), inputs)

# Ejemplo
inputs = torch.tensor([-1.0, 2.0, -0.5, 3.0])
relu = ReLU()
print(f"Entrada: {inputs}")
print(f"Salida ReLU: {relu.forward(inputs)}")`}
        />

        <h3>3.2 Softmax</h3>
        <p>Usada en la capa de salida para clasificación (probabilidades).</p>
        <CodeBlock
          title="softmax.py"
          code={`class Softmax:
    def forward(self, inputs):
        # Restar el máximo para estabilidad numérica
        # inputs shape: (batch, classes)
        # keepdim=True mantiene las dimensiones para broadcasting
        exp_values = torch.exp(inputs - torch.max(inputs, dim=1, keepdim=True).values)
        
        # Normalizar dividiendo por la suma
        probabilities = exp_values / torch.sum(exp_values, dim=1, keepdim=True)
        return probabilities`}
        />
      </section>

      {/* Sección 4: Backpropagation */}
      <section id="backprop" className="section">
        <h2>4. Backpropagation</h2>
        
        <div className="concept-box">
          <div className="concept-title">🎓 El Motor de Aprendizaje</div>
          <p style={{ margin: 0 }}>
            Backpropagation propaga el error desde la salida hacia atrás para calcular 
            cómo debe cambiar cada peso (gradiente) para reducir ese error. Se basa en la 
            <strong>regla de la cadena</strong>:
            <br/><br/>
            <code className="math-inline">dL/dw = dL/dy * dy/dw</code>
          </p>
        </div>

        <CodeBlock
          title="layer_con_backprop.py"
          code={`class LinearLayer:
    def __init__(self, n_inputs, n_neurons):
        # Requiere gradiente para actualizarse
        self.weights = torch.randn(n_inputs, n_neurons, requires_grad=True)
        self.bias = torch.randn(1, n_neurons, requires_grad=True)
        
    def forward(self, inputs):
        self.inputs = inputs
        return torch.matmul(inputs, self.weights) + self.bias

# Ejemplo completo de forward y backward
# 1. Datos
x = torch.tensor([[1.0, 2.0]])  # Input
y_true = torch.tensor([[1.0]])  # Target

# 2. Modelo (una capa)
layer = LinearLayer(2, 1)

# 3. Forward Pass
y_pred = layer.forward(x)

# 4. Loss (MSE: Mean Squared Error)
loss = (y_pred - y_true) ** 2
print(f"Loss inicial: {loss.item():.4f}")

# 5. Backward Pass (Autograd se encarga de la magia)
loss.backward()

# 6. Ver Gradientes
print("\\nGradientes calculados:")
print(f"dL/dw:\\n{layer.weights.grad}")
print(f"dL/db:\\n{layer.bias.grad}")

# 7. Actualización (Optimizer step)
learning_rate = 0.1
with torch.no_grad():
    layer.weights -= learning_rate * layer.weights.grad
    layer.bias -= learning_rate * layer.bias.grad
    
    # Limpiar gradientes para la siguiente iteración
    layer.weights.grad.zero_()
    layer.bias.grad.zero_()

# Verificar mejora
y_new = layer.forward(x)
new_loss = (y_new - y_true) ** 2
print(f"\\nLoss después de actualización: {new_loss.item():.4f}")`}
        />
      </section>

      {/* Sección 5: Red Completa */}
      <section id="training" className="section">
        <h2>5. Uniendo todo: Red Neuronal Simple</h2>
        
        <p>Una red es una secuencia de capas y funciones de activación.</p>

        <CodeBlock
          title="red_completa.py"
          code={`import torch.nn as nn

# Definir una red multicapa (MLP)
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        # Capas
        self.layer1 = nn.Linear(2, 4) # 2 entradas -> 4 ocultas
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(4, 1) # 4 ocultas -> 1 salida
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, x):
        x = self.layer1(x)
        x = self.relu(x)
        x = self.layer2(x)
        x = self.sigmoid(x)
        return x

model = SimpleNet()
print(model)

# Prueba con datos aleatorios
input_data = torch.randn(5, 2) # Batch de 5
output = model(input_data)
print("\\nSalida de la red:\\n", output)`}
        />
      </section>

      {/* Navegación */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border)'
      }}>
        <Link href="/pytorch-fundamentals" className="btn btn-secondary">
          ← PyTorch
        </Link>
        <Link href="/vision-computacional" className="btn btn-primary">
          Siguiente: Visión Computacional (CNNs) →
        </Link>
      </div>
    </div>
  );
}
