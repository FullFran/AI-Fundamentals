import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function VisionComputacional() {
  return (
    <div className="container">
      <h1>👁️ Visión Computacional (CNNs)</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        Las Redes Neuronales Convolucionales (CNNs) son la arquitectura dominante para ver el mundo. 
        A diferencia de los MLPs que destruyen la estructura espacial, las CNNs aprenden patrones locales y jerárquicos.
      </p>

      {/* Tabla de Contenidos */}
      <div className="toc">
        <div className="toc-title">📑 Contenido</div>
        <ul className="toc-list">
          <li className="toc-item"><a href="#imagenes">1. Imágenes como Datos</a></li>
          <li className="toc-item"><a href="#conv2d">2. La Capa Convolucional</a></li>
          <li className="toc-item"><a href="#pooling">3. Pooling (Submuestreo)</a></li>
          <li className="toc-item"><a href="#tinyvgg">4. Arquitectura TinyVGG</a></li>
        </ul>
      </div>

      {/* Sección 1: Imágenes como Datos */}
      <section id="imagenes" className="section">
        <h2>1. Imágenes como Datos</h2>
        
        <div className="concept-box">
          <div className="concept-title">🖼️ NCHW</div>
          <p style={{ margin: 0 }}>
            En PyTorch, las imágenes se representan como tensores de 4 dimensiones: 
            <strong>(Batch_Size, Channels, Height, Width)</strong>.
            Una imagen a color estándar tiene 3 canales (Red, Green, Blue).
          </p>
        </div>

        <CodeBlock
          title="imagen_tensor.py"
          code={`import torch

# Crear una imagen aleatoria "falsa"
# Batch: 1 imagen
# Canales: 3 (RGB)
# Alto: 64 px
# Ancho: 64 px
image = torch.randn(1, 3, 64, 64)

print(f"Shape de la imagen: {image.shape}")
print(f"Número de canales: {image.shape[1]}")

# Nota: Matplotlib espera (H, W, C), así que a veces usamos .permute(1, 2, 0)
image_permuted = image.squeeze().permute(1, 2, 0)
print(f"Shape para visualización: {image_permuted.shape}")`}
        />
      </section>

      {/* Sección 2: Convolución */}
      <section id="conv2d" className="section">
        <h2>2. La Capa Convolucional (Conv2d)</h2>
        
        <p>
          La convolución desliza un pequeño filtro (kernel) sobre la imagen para detectar características 
          como bordes, texturas o formas.
        </p>

        <div className="concept-box">
          <div className="concept-title">⚙️ Hiperparámetros Clave</div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li><strong>in_channels</strong>: Canales de entrada (3 para RGB, 1 para escala de grises).</li>
            <li><strong>out_channels</strong>: Cantidad de filtros a aprender.</li>
            <li><strong>kernel_size</strong>: Tamaño de la ventana deslizante (ej. 3x3).</li>
            <li><strong>stride</strong>: Paso del deslizamiento (1 = pixel a pixel).</li>
            <li><strong>padding</strong>: Bordes extra para mantener el tamaño espacial.</li>
          </ul>
        </div>

        <CodeBlock
          title="conv_layer.py"
          code={`import torch.nn as nn

# Capa convolucional
# Entrada: 3 canales (RGB)
# Salida: 10 filtros (features)
# Kernel: 3x3
# Stride: 1
# Padding: 1 (mantiene el tamaño espacial si kernel=3, stride=1)
conv_layer = nn.Conv2d(in_channels=3, 
                       out_channels=10, 
                       kernel_size=3, 
                       stride=1, 
                       padding=1)

# Pasar la imagen por la capa
output = conv_layer(image)

print(f"Entrada: {image.shape}") # [1, 3, 64, 64]
print(f"Salida: {output.shape}") # [1, 10, 64, 64]
# Ahora tenemos 10 "canales" de características detectadas`}
        />
      </section>

      {/* Sección 3: Pooling */}
      <section id="pooling" className="section">
        <h2>3. Pooling (MaxPoo2d)</h2>
        
        <p>
          El &quot;pooling&quot; reduce las dimensiones espaciales (Alto x Ancho) para reducir el cómputo 
          y extraer las características más prominentes. <strong>MaxPool</strong> toma el valor máximo en una ventana.
        </p>

        <CodeBlock
          title="pooling.py"
          code={`# MaxPool con kernel 2x2
# Esto reduce la imagen a la mitad (64x64 -> 32x32)
max_pool = nn.MaxPool2d(kernel_size=2)

pooled_output = max_pool(output)

print(f"Antes del pooling: {output.shape}")
print(f"Después del pooling: {pooled_output.shape}")
# [1, 10, 32, 32]`}
        />
      </section>

      {/* Sección 4: TinyVGG */}
      <section id="tinyvgg" className="section">
        <h2>4. Replicando TinyVGG</h2>
        
        <p>
          TinyVGG es una arquitectura simple pero efectiva para aprender CNNs. Consta de dos bloques 
          convolucionales seguidos de un clasificador lineal.
        </p>

        <CodeBlock
          title="tiny_vgg.py"
          code={`class TinyVGG(nn.Module):
    def __init__(self, input_shape: int, hidden_units: int, output_shape: int):
        super().__init__()
        
        # Bloque 1: Conv -> ReLU -> Conv -> ReLU -> MaxPool
        self.block_1 = nn.Sequential(
            nn.Conv2d(input_shape, hidden_units, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2) # Divide tamaño espacial por 2
        )
        
        # Bloque 2: Conv -> ReLU -> Conv -> ReLU -> MaxPool
        self.block_2 = nn.Sequential(
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2) # Divide tamaño espacial por 2 otra vez
        )
        
        # Clasificador (Fully Connected)
        self.classifier = nn.Sequential(
            nn.Flatten(), # Aplanar [batch, hidden, H, W] -> [batch, features]
            # Hay que calcular features: 
            # Si entrada 64x64 -> block1 -> 32x32 -> block2 -> 16x16
            # features = hidden_units * 16 * 16
            # Aquí asumiremos entrada 64x64 para el ejemplo
            nn.Linear(hidden_units * 16 * 16, output_shape) 
        )
    
    def forward(self, x):
        x = self.block_1(x)
        x = self.block_2(x)
        x = self.classifier(x)
        return x

# Instanciar modelo
# 3 canales (RGB), 10 unidades ocultas, 4 clases de salida
model = TinyVGG(input_shape=3, hidden_units=10, output_shape=4)

# Prueba con imagen dummy (Batch=1, 3 canales, 64x64)
dummy_img = torch.randn(1, 3, 64, 64)
output = model(dummy_img)

print(f"Salida del modelo: {output.shape}") # [1, 4]
print("Logits:", output)`}
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
        <Link href="/redes-neuronales" className="btn btn-secondary">
          ← Redes Neuronales
        </Link>
        <Link href="/transformers" className="btn btn-primary">
          Siguiente: Transformers →
        </Link>
      </div>
    </div>
  );
}
