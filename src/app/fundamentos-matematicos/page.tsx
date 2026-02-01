'use client';
import CodeBlock from "@/components/CodeBlock";
import CollapsibleSection from "@/components/CollapsibleSection";
import DerivativeGraph from "@/components/DerivativeGraph";
import GradientDescentSimulation from "@/components/GradientDescentSimulation";
import InteractiveGraph from "@/components/InteractiveGraph";
import VectorVisualization from "@/components/VectorVisualization";
import Link from "next/link";

export default function FundamentosMatematicos() {
  return (
    <div className="container">
      <h1>🧮 Fundamentos Matemáticos</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        Las matemáticas son la base de todo en deep learning. Sin entender derivadas, 
        no puedes entender backpropagation. Sin entender vectores, no puedes entender 
        embeddings. Esta sección te dará las bases sólidas que necesitas.
      </p>

      <div className="deep-explanation">
        <h4>🎓 Filosofía de esta Sección</h4>
        <p>
          Como físico, creo firmemente que <strong>visualizar las funciones es esencial</strong> para 
          entender su comportamiento. Por eso, cada concepto incluye gráficas interactivas donde 
          puedes modificar parámetros y ver qué pasa. Juega con ellas.
        </p>
        <p style={{ marginBottom: 0 }}>
          Las secciones colapsables (📖) contienen explicaciones más profundas y derivaciones 
          matemáticas. Son opcionales pero recomendadas si quieres entender el &quot;por qué&quot;.
        </p>
      </div>

      {/* Tabla de Contenidos */}
      <div className="toc">
        <div className="toc-title">📑 Contenido</div>
        <ul className="toc-list">
          <li className="toc-item"><a href="#funciones">1. Funciones Matemáticas</a></li>
          <li className="toc-item"><a href="#derivadas">2. Derivadas (¡Fundamental!)</a></li>
          <li className="toc-item"><a href="#vectores">3. Vectores y Producto Escalar</a></li>
          <li className="toc-item"><a href="#gradientes">4. Gradientes y Descenso del Gradiente</a></li>
          <li className="toc-item"><a href="#matrices">5. Matrices y Redes Neuronales</a></li>
          <li className="toc-item"><a href="#probabilidad">6. Probabilidad y Estadística</a></li>
        </ul>
      </div>

      {/* ========================================
          SECCIÓN 1: FUNCIONES MATEMÁTICAS
          ======================================== */}
      <section id="funciones" className="section">
        <h2>1. Funciones Matemáticas</h2>
        
        <p>
          Una función es una &quot;máquina&quot; que toma un número como entrada (x) y produce 
          otro número como salida (y). En deep learning, las funciones están en todas partes: 
          funciones de activación, funciones de pérdida, transformaciones...
        </p>

        <h3>1.1 Función Lineal: y = kx</h3>
        <p>
          La función más simple. Multiplicar la entrada por una constante k (la pendiente). 
          Esta es la base de las transformaciones lineales en las capas de una red neuronal.
        </p>
        
        <InteractiveGraph type="linear" title="Gráfica Interactiva: Función Lineal" />

        <CodeBlock
          title="funciones_lineales.py"
          code={`import numpy as np
import matplotlib.pyplot as plt

# Ejemplo: y = 2 * x
# Si x = 1, entonces y = 2
# Si x = 5, entonces y = 10

x = 1
y = 2 * x
print(f"Cuando x = {x}, y = {y}")

x = 5
y = 2 * x
print(f"Cuando x = {x}, y = {y}")

# Visualización con diferentes pendientes
x_values = np.linspace(-5, 5, 100)
k_values = [0.5, 1, 2, 3, -1]

plt.figure(figsize=(10, 6))
for k in k_values:
    y_values = k * x_values
    plt.plot(x_values, y_values, label=f'y = {k}x', linewidth=2)

plt.xlabel('x')
plt.ylabel('y')
plt.title('Funciones Lineales: y = kx')
plt.grid(True, alpha=0.3)
plt.legend()
plt.show()`}
        />

        <CollapsibleSection title="Entender la pendiente k" icon="📖">
          <p>
            La <strong>pendiente k</strong> determina qué tan rápido sube (o baja) la recta:
          </p>
          <ul>
            <li><strong>k &gt; 0</strong>: La recta sube de izquierda a derecha.</li>
            <li><strong>k &lt; 0</strong>: La recta baja de izquierda a derecha.</li>
            <li><strong>k = 0</strong>: La recta es horizontal (salida constante 0).</li>
            <li><strong>|k| grande</strong>: Más inclinada.</li>
          </ul>
          <p>
            En una neurona, los pesos (weights) funcionan como estas pendientes: escalan 
            la entrada antes de sumarla con otras.
          </p>
        </CollapsibleSection>

        <h3>1.2 Función Cuadrática: y = x²</h3>
        <p>
          Elevar al cuadrado la entrada. Si x = 2, entonces y = 4. Si x = -2, también y = 4.
          Los negativos se vuelven positivos. Esto es crucial para funciones de pérdida como 
          MSE (Mean Squared Error), donde queremos penalizar errores sin importar su signo.
        </p>
        
        <InteractiveGraph type="quadratic" title="Gráfica: y = x²" />


        <CodeBlock
          title="funciones_cuadraticas.py"
          code={`import numpy as np
import matplotlib.pyplot as plt

# y = x²
examples = [-3, -2, -1, 0, 1, 2, 3]
for x in examples:
    y = x ** 2
    print(f"Cuando x = {x}, y = x² = {y}")

# Nota: los negativos también dan positivo!
# Esto es útil para funciones de pérdida (MSE)

# Visualización
x_values = np.linspace(-5, 5, 100)
y_values = x_values ** 2

plt.figure(figsize=(8, 5))
plt.plot(x_values, y_values, 'r-', linewidth=2, label='y = x²')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Función Cuadrática: y = x²')
plt.grid(True, alpha=0.3)
plt.legend()
plt.show()`}
        />

        <h3>1.3 Función Exponencial: y = e^x</h3>
        <p>
          La exponencial crece explosivamente. Es la base de softmax y de muchas distribuciones 
          de probabilidad.
        </p>
        
        <InteractiveGraph type="exponential" title="Gráfica Interactiva: Exponencial" />

        <h3>1.4 Función Sigmoide</h3>
        <div className="concept-box">
          <div className="concept-title">🔥 Muy Importante</div>
          <p style={{ margin: 0 }}>
            La sigmoide &quot;aplasta&quot; cualquier número real al rango (0, 1). 
            Perfecta para representar probabilidades y para clasificación binaria.
          </p>
        </div>
        
        <InteractiveGraph type="sigmoid" title="Gráfica Interactiva: Sigmoide" />

        <CodeBlock
          title="funcion_sigmoide.py"
          code={`import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    \"\"\"
    Función Sigmoide: σ(x) = 1 / (1 + e^(-x))
    
    - Cuando x → ∞, σ(x) → 1
    - Cuando x → -∞, σ(x) → 0
    - Cuando x = 0, σ(x) = 0.5
    \"\"\"
    return 1 / (1 + np.exp(-x))

# Ejemplos
print(f\"sigmoid(-10) = {sigmoid(-10):.6f}\")  # Cercano a 0
print(f\"sigmoid(0) = {sigmoid(0):.6f}\")      # Exactamente 0.5
print(f\"sigmoid(10) = {sigmoid(10):.6f}\")    # Cercano a 1

# Visualización
x = np.linspace(-10, 10, 100)
y = sigmoid(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2, label='σ(x)')
plt.axhline(y=0.5, color='r', linestyle='--', alpha=0.5, label='y = 0.5')
plt.xlabel('x')
plt.ylabel('σ(x)')
plt.title('Función Sigmoide')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()`}
        />

        <CollapsibleSection title="La fórmula de la sigmoide y por qué funciona" icon="📖">
          <div className="math-block">
            σ(x) = 1 / (1 + e^(-x))
          </div>
          <p>
            Observa que cuando x es muy grande y positivo, e^(-x) → 0, así que σ(x) → 1.
            Cuando x es muy grande y negativo, e^(-x) → ∞, así que σ(x) → 0.
            Y cuando x = 0, e^0 = 1, así que σ(0) = 0.5.
          </p>
          <p>
            Esta propiedad de &quot;saturación&quot; en los extremos puede causar problemas 
            de gradientes que desaparecen (vanishing gradients), por lo que hoy se prefiere 
            ReLU en capas ocultas.
          </p>
        </CollapsibleSection>

        <h3>1.5 Función ReLU</h3>
        <p>
          ReLU (Rectified Linear Unit) es la función de activación más usada hoy. 
          Simplemente: si x &lt; 0, devuelve 0. Si x ≥ 0, devuelve x.
        </p>
        
        <InteractiveGraph type="relu" title="Gráfica Interactiva: ReLU" />
      </section>

      {/* ========================================
          SECCIÓN 2: DERIVADAS
          ======================================== */}
      <section id="derivadas" className="section">
        <h2>2. Derivadas</h2>

        <div className="deep-explanation">
          <h4>⚠️ ¡Esto es FUNDAMENTAL!</h4>
          <p>
            Si no entiendes derivadas conceptualmente, <strong>nunca</strong> entenderás 
            cómo aprenden las redes neuronales. Backpropagation (el algoritmo que entrena 
            las redes) es esencialmente calcular derivadas en cadena.
          </p>
        </div>

        <h3>2.1 ¿Qué es una derivada? (La intuición)</h3>
        <p>
          Imagina que estás subiendo una colina. La <strong>derivada</strong> te dice 
          qué tan empinada está la pendiente en el punto exacto donde estás parado.
        </p>
        
        <div className="concept-box">
          <div className="concept-title">📐 Definición Intuitiva</div>
          <p style={{ margin: 0 }}>
            La derivada mide <strong>cuánto cambia la salida (y) cuando la entrada (x) 
            cambia un poquito</strong>. Es la &quot;tasa de cambio instantánea&quot;.
          </p>
        </div>

        <p>
          Matemáticamente, si incrementamos x por una cantidad muy pequeña h, miramos 
          cuánto cambió y, y dividimos:
        </p>

        <div className="math-block">
          f&apos;(x) = lim (h→0) [ f(x + h) - f(x) ] / h
        </div>

        <p>
          Cuando h es muy pequeño, esta fracción nos da la pendiente <strong>exacta</strong> 
          de la función en ese punto.
        </p>

        <DerivativeGraph />

        <CodeBlock
          title="derivada_numerica.py"
          code={`import numpy as np

# La derivada es el límite cuando h → 0 de:
# f'(x) = (f(x + h) - f(x)) / h

def derivada_numerica(f, x, h=1e-7):
    """Calcula la derivada de f en x usando diferencias finitas."""
    return (f(x + h) - f(x)) / h

# Ejemplo: f(x) = x²
# La derivada analítica es f'(x) = 2x
def f(x):
    return x ** 2

# Verificar en x = 3
# f'(3) debería ser 2 * 3 = 6
x = 3
derivada = derivada_numerica(f, x)
print(f"Derivada numérica de x² en x=3: {derivada:.6f}")
print(f"Derivada analítica (2x): {2 * x}")`}
        />

        <CollapsibleSection title="Entendiendo la definición paso a paso" icon="📖">
          <p>
            Vamos a desglosar la definición de derivada:
          </p>
          <ol>
            <li>
              <strong>f(x + h) - f(x)</strong>: Es cuánto &quot;subió&quot; o &quot;bajó&quot; la función 
              cuando movimos la entrada de x a x + h.
            </li>
            <li>
              <strong>/ h</strong>: Dividimos por cuánto nos movimos. Esto nos da la 
              &quot;razón de cambio&quot; - cuánto cambió y POR CADA unidad que cambió x.
            </li>
            <li>
              <strong>lim (h→0)</strong>: Tomamos el límite cuando h se hace infinitamente 
              pequeño. Esto convierte la &quot;pendiente promedio&quot; entre dos puntos en la 
              &quot;pendiente instantánea&quot; en un solo punto.
            </li>
          </ol>
          <p>
            <strong>Analogía:</strong> Si conduces 100 km en 2 horas, tu velocidad promedio 
            es 50 km/h. Pero la derivada sería tu velocidad instantánea en un momento exacto 
            (lo que marca el velocímetro).
          </p>
        </CollapsibleSection>

        <h3>2.2 Reglas de Derivación</h3>
        <p>
          Afortunadamente, no tenemos que calcular el límite cada vez. Hay reglas:
        </p>

        <CodeBlock
          title="reglas_derivadas.py"
          code={`# Reglas fundamentales de derivación:

# 1. Constante: d/dx[c] = 0
#    La derivada de un número fijo es 0 (no cambia)

# 2. Potencia: d/dx[x^n] = n * x^(n-1)
#    Ejemplo: d/dx[x²] = 2x
#    Ejemplo: d/dx[x³] = 3x²

# 3. Suma: d/dx[f + g] = df/dx + dg/dx
#    La derivada de una suma es la suma de las derivadas

# 4. Producto: d/dx[f * g] = f'g + fg'
#    Un poco más complicado, pero importante

# 5. Cadena: d/dx[f(g(x))] = f'(g(x)) * g'(x)
#    ¡LA MÁS IMPORTANTE PARA DEEP LEARNING!`}
        />

        <h3>2.3 La Regla de la Cadena</h3>
        <div className="concept-box">
          <div className="concept-title">⚡ El Corazón de Backpropagation</div>
          <p style={{ margin: 0 }}>
            La regla de la cadena nos dice cómo derivar funciones compuestas (funciones 
            dentro de funciones). En una red neuronal, los datos pasan por muchas capas 
            - eso es una función compuesta gigante.
          </p>
        </div>

        <div className="math-block">
          Si y = f(g(x)), entonces dy/dx = f&apos;(g(x)) · g&apos;(x)
        </div>

        <CollapsibleSection title="Ejemplo: Cómo funciona la regla de la cadena" icon="📖">
          <p>
            Supongamos que tenemos h(x) = (x² + 1)³
          </p>
          <p>
            Podemos ver esto como dos funciones anidadas:
          </p>
          <ul>
            <li>Función &quot;interior&quot;: g(x) = x² + 1</li>
            <li>Función &quot;exterior&quot;: f(u) = u³ (donde u = g(x))</li>
          </ul>
          <p>
            Ahora aplicamos la regla de la cadena:
          </p>
          <ol>
            <li>Derivada de f: f&apos;(u) = 3u² = 3(x² + 1)²</li>
            <li>Derivada de g: g&apos;(x) = 2x</li>
            <li>Multiplicamos: h&apos;(x) = 3(x² + 1)² · 2x = 6x(x² + 1)²</li>
          </ol>
          <p>
            <strong>En backpropagation</strong>, hacemos exactamente esto pero hacia atrás: 
            empezamos con el error final y &quot;propagamos&quot; las derivadas hacia atrás a 
            través de cada capa usando la regla de la cadena.
          </p>
        </CollapsibleSection>
      </section>

      {/* ========================================
          SECCIÓN 3: VECTORES
          ======================================== */}
      <section id="vectores" className="section">
        <h2>3. Vectores y Producto Escalar</h2>

        <p>
          Un vector es simplemente una lista ordenada de números. En deep learning, 
          los datos casi siempre están en forma de vectores (o matrices/tensores).
        </p>

        <div className="concept-box">
          <div className="concept-title">📚 Nota Importante</div>
          <p style={{ margin: 0 }}>
            Esta sección cubre lo mínimo necesario. Para una comprensión profunda, 
            recomiendo completar un curso de Álgebra Lineal (3Blue1Brown tiene uno 
            excelente y visual en YouTube: &quot;Essence of Linear Algebra&quot;).
          </p>
        </div>

        <h3>3.1 El Producto Escalar (Dot Product)</h3>
        <p>
          El producto escalar es <strong>LA operación</strong> más importante en redes 
          neuronales. Cada neurona básicamente calcula un producto escalar entre sus 
          entradas y sus pesos.
        </p>

        <div className="math-block">
          a · b = a₁b₁ + a₂b₂ + ... + aₙbₙ = |a| |b| cos(θ)
        </div>

        <CodeBlock
          title="operaciones_vectores.py"
          code={`import numpy as np

# Crear vectores
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

print("Vector v1:", v1)
print("Vector v2:", v2)

# Operaciones básicas
print("\\n--- Operaciones Básicas ---")
print("Suma v1 + v2:", v1 + v2)
print("Resta v1 - v2:", v1 - v2)
print("Multiplicación elemento a elemento:", v1 * v2)

# Producto escalar (dot product) - ¡MUY IMPORTANTE!
dot_product = np.dot(v1, v2)  # = 1*4 + 2*5 + 3*6 = 32
print("\\n--- Producto Escalar ---")
print("v1 · v2 =", dot_product)

# Norma (magnitud del vector)
norma = np.linalg.norm(v1)
print("\\n--- Norma ---")
print("||v1|| =", norma)`}
        />

        <VectorVisualization />

        <CollapsibleSection title="¿Por qué el producto escalar mide similitud?" icon="📖">
          <p>
            La fórmula <code>a · b = |a| |b| cos(θ)</code> nos revela algo profundo:
          </p>
          <ul>
            <li>
              <strong>cos(0°) = 1</strong>: Vectores paralelos (misma dirección) → producto máximo.
            </li>
            <li>
              <strong>cos(90°) = 0</strong>: Vectores perpendiculares → producto cero.
            </li>
            <li>
              <strong>cos(180°) = -1</strong>: Vectores opuestos → producto negativo.
            </li>
          </ul>
          <p>
            Por eso el <strong>Cosine Similarity</strong> (producto escalar normalizado) 
            se usa tanto en NLP y sistemas de búsqueda. Si tienes dos embeddings de 
            oraciones y su cosine similarity es alta, las oraciones son &quot;similares&quot; 
            semánticamente.
          </p>
          <p>
            En RAG (Retrieval-Augmented Generation), buscamos documentos cuyo embedding 
            tenga alto cosine similarity con la pregunta del usuario.
          </p>
        </CollapsibleSection>

        <h3>3.2 ¿Qué es una Neurona Artificial?</h3>
        
        <p>
          Una <strong>neurona artificial</strong> es la unidad básica de una red neuronal. 
          Está inspirada (vagamente) en las neuronas biológicas: recibe señales de entrada, 
          las procesa, y produce una salida.
        </p>

        <div className="concept-box">
          <div className="concept-title">🧠 Anatomía de una Neurona</div>
          <p style={{ margin: 0 }}>
            Una neurona recibe múltiples <strong>entradas</strong> (x₁, x₂, ..., xₙ), 
            cada una multiplicada por un <strong>peso</strong> (w₁, w₂, ..., wₙ). 
            Suma todo, añade un <strong>sesgo</strong> (b), y pasa el resultado por 
            una <strong>función de activación</strong>.
          </p>
        </div>

        {/* Diagrama de Neurona estilo ASCII/SVG */}
        <div className="interactive-graph">
          <h4 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--highlight)', textAlign: 'center' }}>
            Diagrama de una Neurona
          </h4>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '1.5rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px'
          }}>
            <svg viewBox="0 0 400 180" style={{ maxWidth: '500px', width: '100%' }}>
              {/* Entradas */}
              <circle cx="50" cy="40" r="20" fill="none" stroke="#7c3aed" strokeWidth="2"/>
              <text x="50" y="45" textAnchor="middle" fill="#f0f0f0" fontSize="14">x₁</text>
              
              <circle cx="50" cy="90" r="20" fill="none" stroke="#7c3aed" strokeWidth="2"/>
              <text x="50" y="95" textAnchor="middle" fill="#f0f0f0" fontSize="14">x₂</text>
              
              <circle cx="50" cy="140" r="20" fill="none" stroke="#7c3aed" strokeWidth="2"/>
              <text x="50" y="145" textAnchor="middle" fill="#f0f0f0" fontSize="14">x₃</text>
              
              {/* Líneas con pesos */}
              <line x1="70" y1="40" x2="150" y2="90" stroke="#a0a0b0" strokeWidth="2"/>
              <text x="100" y="55" fill="#f59e0b" fontSize="10">w₁</text>
              
              <line x1="70" y1="90" x2="150" y2="90" stroke="#a0a0b0" strokeWidth="2"/>
              <text x="100" y="82" fill="#f59e0b" fontSize="10">w₂</text>
              
              <line x1="70" y1="140" x2="150" y2="90" stroke="#a0a0b0" strokeWidth="2"/>
              <text x="100" y="125" fill="#f59e0b" fontSize="10">w₃</text>
              
              {/* Neurona central (suma) */}
              <circle cx="180" cy="90" r="30" fill="none" stroke="#00d4ff" strokeWidth="3"/>
              <text x="180" y="95" textAnchor="middle" fill="#00d4ff" fontSize="16">Σ</text>
              
              {/* Bias */}
              <line x1="180" y1="150" x2="180" y2="120" stroke="#10b981" strokeWidth="2"/>
              <text x="180" y="165" textAnchor="middle" fill="#10b981" fontSize="12">+b</text>
              
              {/* Flecha a activación */}
              <line x1="210" y1="90" x2="260" y2="90" stroke="#a0a0b0" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              
              {/* Función de activación */}
              <rect x="260" y="65" width="60" height="50" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
              <text x="290" y="85" textAnchor="middle" fill="#f59e0b" fontSize="10">Activación</text>
              <text x="290" y="102" textAnchor="middle" fill="#f59e0b" fontSize="12">σ(z)</text>
              
              {/* Salida */}
              <line x1="320" y1="90" x2="360" y2="90" stroke="#a0a0b0" strokeWidth="2"/>
              <circle cx="375" cy="90" r="15" fill="none" stroke="#10b981" strokeWidth="2"/>
              <text x="375" y="95" textAnchor="middle" fill="#10b981" fontSize="12">y</text>
              
              {/* Arrowhead definition */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a0a0b0"/>
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <h4>Las Ecuaciones de una Neurona</h4>
        
        <p>Matemáticamente, una neurona hace dos operaciones:</p>
        
        <p><strong>1. Suma ponderada (producto escalar + sesgo):</strong></p>
        <div className="math-block">
          z = x₁·w₁ + x₂·w₂ + ... + xₙ·wₙ + b = x⃗ · w⃗ + b
        </div>
        
        <p><strong>2. Función de activación:</strong></p>
        <div className="math-block">
          y = σ(z)
        </div>
        
        <p>
          Donde σ puede ser ReLU, Sigmoid, Tanh, etc. La función de activación introduce 
          <strong> no-linealidad</strong>, lo que permite a la red aprender patrones complejos. 
          Sin ella, apilar capas sería equivalente a una sola capa lineal.
        </p>

        <h4>Implementación en Python</h4>
        <CodeBlock
          title="producto_escalar_neurona.py"
          code={`import numpy as np

# Una neurona hace esto:
# output = activation(inputs · weights + bias)

inputs = np.array([1.0, 2.0, 3.0])   # Entrada (vector de 3 features)
weights = np.array([0.5, -0.5, 0.3]) # Pesos de la neurona
bias = 0.1

# Paso 1: Suma ponderada (producto escalar + bias)
z = np.dot(inputs, weights) + bias
# z = 1.0*0.5 + 2.0*(-0.5) + 3.0*0.3 + 0.1
# z = 0.5 - 1.0 + 0.9 + 0.1 = 0.5

print(f"z = inputs · weights + bias = {z}")

# Paso 2: Función de activación (ReLU)
def relu(x):
    return max(0, x)

output = relu(z)
print(f"output = ReLU(z) = {output}")`}
        />
      </section>

      {/* ========================================
          SECCIÓN 4: GRADIENTES
          ======================================== */}
      <section id="gradientes" className="section">
        <h2>4. Gradientes y Descenso del Gradiente</h2>

        <p>
          El gradiente es simplemente la derivada pero para funciones de múltiples variables. 
          Es un <strong>vector</strong> que apunta en la dirección donde la función crece más rápido.
        </p>

        <div className="concept-box">
          <div className="concept-title">🎯 La Idea Central</div>
          <p style={{ margin: 0 }}>
            Si el gradiente te dice hacia dónde &quot;sube&quot; la función más rápido, 
            entonces ir en dirección <strong>opuesta</strong> al gradiente te lleva 
            hacia donde la función &quot;baja&quot; más rápido. Así encontramos el mínimo 
            de la función de pérdida.
          </p>
        </div>

        <div className="math-block">
          Para f(x, y): ∇f = [∂f/∂x, ∂f/∂y]
        </div>

        <h3>4.1 La Regla de Actualización (SGD)</h3>
        <p>
          El algoritmo de <strong>Descenso de Gradiente Estocástico (SGD)</strong> actualiza 
          los parámetros θ en cada iteración siguiendo esta regla:
        </p>
        
        <div className="math-block">
          θₜ₊₁ = θₜ - α · ∇L(θₜ)
        </div>
        
        <p>Donde:</p>
        <ul>
          <li><strong>θₜ</strong>: Parámetros actuales (pesos de la red)</li>
          <li><strong>α</strong>: Learning rate (tasa de aprendizaje) - qué tan grande es cada paso</li>
          <li><strong>∇L(θₜ)</strong>: Gradiente de la función de pérdida respecto a los parámetros</li>
          <li><strong>θₜ₊₁</strong>: Nuevos parámetros después de la actualización</li>
        </ul>

        <div className="concept-box">
          <div className="concept-title">⚠️ El signo menos es crucial</div>
          <p style={{ margin: 0 }}>
            <strong>Restamos</strong> el gradiente porque queremos ir en la dirección opuesta 
            al crecimiento. El gradiente apunta &quot;cuesta arriba&quot;; nosotros queremos ir 
            &quot;cuesta abajo&quot; hacia el mínimo.
          </p>
        </div>

        <h3>4.2 Momentum</h3>
        <p>
          El problema de SGD básico es que puede oscilar o quedarse atrapado. 
          <strong> Momentum</strong> añade &quot;inercia&quot; - el algoritmo recuerda la dirección 
          en la que venía moviéndose.
        </p>

        <div className="math-block">
          vₜ = β · vₜ₋₁ + α · ∇L(θₜ)
        </div>
        <div className="math-block">
          θₜ₊₁ = θₜ - vₜ
        </div>

        <p>Donde:</p>
        <ul>
          <li><strong>vₜ</strong>: Velocidad acumulada (como la velocidad de una bola rodando)</li>
          <li><strong>β</strong>: Coeficiente de momentum (típicamente 0.9) - cuánto &quot;recuerda&quot;</li>
        </ul>

        <div className="deep-explanation">
          <h4>🎱 Analogía Física</h4>
          <p>
            Imagina una bola rodando por una colina. Sin momentum, la bola se para en cada 
            hoyo pequeño. Con momentum, la bola acumula velocidad y puede &quot;saltar&quot; sobre 
            baches pequeños para llegar al valle más profundo.
          </p>
        </div>

        <h3>4.3 Simulación Interactiva</h3>
        <p>
          Prueba la simulación. Observa cómo SGD puede zigzaguear mientras que 
          Momentum suaviza el camino. ¡Genera nuevas superficies para ver diferentes casos!
        </p>

        <GradientDescentSimulation />

        <CodeBlock
          title="descenso_gradiente.py"
          code={`import numpy as np

def f(x, y):
    """Función a minimizar: f(x, y) = x² + y²"""
    return x**2 + y**2

def gradient_f(x, y):
    """Gradiente de f: ∇f = [2x, 2y]"""
    return np.array([2*x, 2*y])

# ===== SGD BÁSICO =====
learning_rate = 0.1
position = np.array([5.0, 5.0])

for i in range(50):
    grad = gradient_f(*position)
    position = position - learning_rate * grad  # θ = θ - α∇L

# ===== CON MOMENTUM =====
position = np.array([5.0, 5.0])
velocity = np.array([0.0, 0.0])
beta = 0.9  # Coeficiente de momentum

for i in range(50):
    grad = gradient_f(*position)
    velocity = beta * velocity + learning_rate * grad  # v = βv + α∇L
    position = position - velocity                      # θ = θ - v`}
        />

        <h3>4.4 Optimizadores Modernos</h3>
        <p>
          En la práctica, casi siempre usamos <strong>Adam</strong> que combina 
          momentum con learning rates adaptativos por parámetro.
        </p>

        <CollapsibleSection title="Adam: El optimizador estándar moderno" icon="📖">
          <p>
            <strong>Adam</strong> (Adaptive Moment Estimation) combina dos ideas:
          </p>
          <ol>
            <li>
              <strong>Momentum</strong>: Acumula una media móvil de los gradientes pasados 
              (primer momento).
            </li>
            <li>
              <strong>RMSprop/AdaGrad</strong>: Adapta el learning rate para cada parámetro 
              basándose en la magnitud de sus gradientes históricos (segundo momento).
            </li>
          </ol>
          <p>
            Esto hace que Adam converja rápidamente y funcione bien &quot;out of the box&quot; 
            para la mayoría de problemas. Es el optimizador por defecto en casi todos 
            los frameworks.
          </p>
          <CodeBlock
            title="usar_adam.py"
            code={`import torch.optim as optim

# Crear optimizador Adam
optimizer = optim.Adam(model.parameters(), lr=0.001)

# En el loop de entrenamiento:
optimizer.zero_grad()  # Limpiar gradientes
loss.backward()        # Calcular gradientes (backprop)
optimizer.step()       # Actualizar pesos con Adam`}
          />
        </CollapsibleSection>
      </section>

      {/* ========================================
          SECCIÓN 5: MATRICES
          ======================================== */}
      <section id="matrices" className="section">
        <h2>5. Matrices y Redes Neuronales</h2>

        <p>
          Una matriz es una tabla rectangular de números. En deep learning, las matrices 
          son fundamentales porque <strong>cada capa de una red neuronal es una multiplicación 
          matricial</strong>.
        </p>

        <h3>5.1 ¿Qué hace realmente una neurona?</h3>
        <p>
          Antes de ver matrices, entendamos qué hace UNA neurona, y luego veremos cómo 
          una capa entera es simplemente hacer muchas neuronas en paralelo (= multiplicación matricial).
        </p>

        <div className="concept-box">
          <div className="concept-title">🧠 Una Neurona = Producto Escalar + Activación</div>
          <p style={{ margin: 0 }}>
            <code>output = activation(inputs · weights + bias)</code>
            <br /><br />
            Es decir: toma las entradas, las multiplica por pesos, suma todo, añade un sesgo, 
            y pasa el resultado por una función no lineal.
          </p>
        </div>

        <h3>5.2 Una Capa = Muchas Neuronas = Multiplicación Matricial</h3>
        <p>
          Si tenemos 3 entradas y queremos 4 neuronas, en lugar de hacer 4 productos escalares 
          separados, podemos hacer UNA multiplicación matricial:
        </p>

        <CodeBlock
          title="capa_como_matriz.py"
          code={`import numpy as np

# Entrada: vector de 3 features
inputs = np.array([[1.0, 2.0, 3.0]])  # Shape: (1, 3) - un ejemplo

# Capa con 4 neuronas
# Cada columna de W son los pesos de una neurona
W = np.array([[0.1, 0.2, 0.3, 0.4],   # Pesos para input 1
              [0.5, 0.6, 0.7, 0.8],   # Pesos para input 2
              [0.9, 1.0, 1.1, 1.2]])  # Pesos para input 3
# Shape: (3, 4) - 3 inputs, 4 neuronas

bias = np.array([0.1, 0.1, 0.1, 0.1])  # Un bias por neurona

# La "magia": UNA multiplicación matricial calcula las 4 neuronas
z = inputs @ W + bias  # Shape: (1, 4)
print(f"Salida de la capa: {z}")

# Aplicar activación
output = np.maximum(0, z)  # ReLU
print(f"Después de ReLU: {output}")`}
        />

        <CollapsibleSection title="Visualizando el flujo de datos" icon="📖">
          <p>
            Piénsalo así:
          </p>
          <ul>
            <li><strong>Input</strong>: Un vector de N números (features de un ejemplo).</li>
            <li><strong>Weights</strong>: Una matriz de N×M donde M es el número de neuronas.</li>
            <li><strong>Output</strong>: Un vector de M números (uno por neurona).</li>
          </ul>
          <p>
            La multiplicación matricial hace simultáneamente los N productos escalares 
            que cada neurona necesita. Es por esto que las GPUs (diseñadas para multiplicar 
            matrices rápidamente) son tan buenas para deep learning.
          </p>
          <p>
            Si tienes un batch de B ejemplos, tu input tiene shape (B, N) y la salida 
            tiene shape (B, M). ¡Procesas B ejemplos en paralelo!
          </p>
        </CollapsibleSection>
      </section>

      {/* ========================================
          SECCIÓN 6: PROBABILIDAD
          ======================================== */}
      <section id="probabilidad" className="section">
        <h2>6. Probabilidad y Estadística</h2>

        <p>
          La probabilidad es esencial para entender cómo los modelos hacen predicciones 
          y cómo medimos si esas predicciones son buenas o malas.
        </p>

        <h3>6.1 Distribución de Probabilidad</h3>
        <p>
          Una distribución asigna probabilidades a diferentes resultados posibles. 
          Todas las probabilidades deben sumar 1.
        </p>

        <CodeBlock
          title="distribucion_probabilidad.py"
          code={`import numpy as np

# Ejemplo: clasificación de 3 clases (gato, perro, pájaro)
# La salida de softmax es una distribución de probabilidad

logits = np.array([2.0, 1.0, 0.1])  # Salida cruda de la red

def softmax(x):
    exp_x = np.exp(x - np.max(x))  # Restar max para estabilidad
    return exp_x / exp_x.sum()

probabilidades = softmax(logits)

clases = ['gato', 'perro', 'pájaro']
for clase, prob in zip(clases, probabilidades):
    print(f"P({clase}) = {prob:.3f}")

print(f"\\nSuma = {probabilidades.sum():.3f}")  # Siempre 1.0
print(f"Predicción: {clases[np.argmax(probabilidades)]}")`}
        />

        <h3>6.2 Cross-Entropy Loss</h3>
        <p>
          Cross-entropy mide qué tan &quot;diferentes&quot; son dos distribuciones de probabilidad. 
          En clasificación, comparamos la distribución predicha con la distribución real 
          (que es 100% en la clase correcta).
        </p>

        <div className="math-block">
          H(y, ŷ) = -Σ y_i · log(ŷ_i)
        </div>

        <CollapsibleSection title="Entendiendo Cross-Entropy intuitivamente" icon="📖">
          <p>
            Supongamos que la clase correcta es &quot;gato&quot; (clase 0):
          </p>
          <ul>
            <li>Etiqueta real (one-hot): y = [1, 0, 0]</li>
            <li>Predicción buena: ŷ = [0.9, 0.05, 0.05]</li>
            <li>Predicción mala: ŷ = [0.1, 0.5, 0.4]</li>
          </ul>
          <p>
            Como y_i = 1 solo para la clase correcta (gato), la fórmula se simplifica a:
          </p>
          <div className="math-block">
            H = -log(ŷ_gato)
          </div>
          <ul>
            <li>Predicción buena: H = -log(0.9) ≈ 0.105 (loss bajo = bueno)</li>
            <li>Predicción mala: H = -log(0.1) ≈ 2.303 (loss alto = malo)</li>
          </ul>
          <p>
            Cuanto más seguro está el modelo de la respuesta correcta (ŷ cercano a 1), 
            menor es el loss. Si el modelo asigna probabilidad casi 0 a la respuesta correcta, 
            el loss explota → gran corrección en backprop.
          </p>
        </CollapsibleSection>

        <h3>6.3 Esperanza Matemática (Valor Esperado)</h3>
        <p>
          El valor esperado es el &quot;promedio ponderado&quot; de todos los resultados posibles.
        </p>

        <div className="math-block">
          E[X] = Σ x_i · P(x_i)
        </div>

        <CodeBlock
          title="esperanza_matematica.py"
          code={`import numpy as np

# Ejemplo: Valor esperado de un dado de 6 caras
caras = np.array([1, 2, 3, 4, 5, 6])
probs = np.array([1/6] * 6)  # Cada cara tiene prob 1/6

esperanza = np.sum(caras * probs)

print(f"E[dado] = {esperanza:.2f}")
# = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5

# Nota: 3.5 no es un resultado posible,
# pero es el promedio a largo plazo si tiras muchas veces`}
        />

        <h3>6.4 Probabilidad Condicional</h3>
        <p>
          P(A|B) es la probabilidad de A <strong>dado que ya sabemos</strong> que B ocurrió.
        </p>

        <div className="math-block">
          P(A|B) = P(A ∩ B) / P(B)
        </div>

        <CollapsibleSection title="Ejemplo práctico" icon="📖">
          <p>
            Lanzamos un dado. Sea:
          </p>
          <ul>
            <li>A = obtener un 6</li>
            <li>B = obtener un número par (2, 4, o 6)</li>
          </ul>
          <p>
            ¿Cuál es P(6 | par)?
          </p>
          <ul>
            <li>P(A ∩ B) = P(6 y par) = 1/6 (el único resultado que es 6 y par es el 6)</li>
            <li>P(B) = P(par) = 3/6 = 0.5</li>
            <li>P(6 | par) = (1/6) / (0.5) = 1/3 ≈ 0.33</li>
          </ul>
          <p>
            Tiene sentido: si ya sabemos que es par, solo puede ser 2, 4 o 6. 
            La probabilidad de que sea específicamente 6 es 1 de 3.
          </p>
          <p>
            <strong>En NLP</strong>: Los modelos de lenguaje calculan P(siguiente_palabra | palabras_anteriores). 
            ¡Es probabilidad condicional pura!
          </p>
        </CollapsibleSection>
      </section>

      {/* Navegación */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border)'
      }}>
        <Link href="/" className="btn btn-secondary">
          ← Volver al Inicio
        </Link>
        <Link href="/pytorch-fundamentals" className="btn btn-primary">
          Siguiente: PyTorch →
        </Link>
      </div>
    </div>
  );
}
