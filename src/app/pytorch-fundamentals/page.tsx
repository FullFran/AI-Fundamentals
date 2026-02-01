import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function PyTorchFundamentals() {
  return (
    <div className="container">
      <h1>🔥 Fundamentos de PyTorch</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        PyTorch es el framework estándar para investigación en IA. Dominar los tensores 
        y sus operaciones te permitirá implementar cualquier arquitectura.
      </p>

      {/* Tabla de Contenidos */}
      <div className="toc">
        <div className="toc-title">📑 Contenido</div>
        <ul className="toc-list">
          <li className="toc-item"><a href="#tensores">1. Creación de Tensores</a></li>
          <li className="toc-item"><a href="#matmul">2. Multiplicación Matricial</a></li>
          <li className="toc-item"><a href="#transpose">3. Transposición</a></li>
          <li className="toc-item"><a href="#reshape">4. Reshape, View y Squeeze</a></li>
          <li className="toc-item"><a href="#indexing">5. Indexing y Slicing</a></li>
          <li className="toc-item"><a href="#concat">6. Concatenación y Stacking</a></li>
          <li className="toc-item"><a href="#special">7. Tensores Especiales</a></li>
        </ul>
      </div>

      {/* Sección 1: Creación de Tensores */}
      <section id="tensores" className="section">
        <h2>1. Creación de Tensores</h2>
        
        <div className="concept-box">
          <div className="concept-title">💡 ¿Qué es un Tensor?</div>
          <p style={{ margin: 0 }}>
            Un tensor es una generalización de vectores y matrices a dimensiones arbitrarias. 
            Un escalar es un tensor 0D, un vector es 1D, una matriz es 2D, y así sucesivamente.
          </p>
        </div>

        <CodeBlock
          title="crear_tensores.py"
          code={`import torch

# Crear un tensor desde una lista
tensor_1d = torch.tensor([1, 2, 3, 4, 5])
print("Tensor 1D:", tensor_1d)
print("Shape:", tensor_1d.shape)

# Tensor 2D (matriz)
tensor_2d = torch.tensor([[1, 2, 3],
                          [4, 5, 6]])
print("\\nTensor 2D:")
print(tensor_2d)
print("Shape:", tensor_2d.shape)

# Tensor 3D
tensor_3d = torch.tensor([[[1, 2], [3, 4]],
                          [[5, 6], [7, 8]]])
print("\\nTensor 3D:")
print(tensor_3d)
print("Shape:", tensor_3d.shape)`}
        />

        <h3>1.1 Tensores de Zeros y Ones</h3>
        <CodeBlock
          title="zeros_ones.py"
          code={`import torch

# Tensor de ceros
zeros = torch.zeros(3, 4)
print("Zeros (3x4):")
print(zeros)

# Tensor de unos
ones = torch.ones(2, 3)
print("\\nOnes (2x3):")
print(ones)

# Tensor vacío (sin inicializar, valores aleatorios)
empty = torch.empty(2, 2)
print("\\nEmpty (2x2):")
print(empty)

# Tensor con un valor específico
full = torch.full((2, 3), fill_value=7.0)
print("\\nFull de 7s (2x3):")
print(full)`}
        />

        <h3>1.2 Tensores Aleatorios</h3>
        <CodeBlock
          title="tensores_aleatorios.py"
          code={`import torch

# Para reproducibilidad
torch.manual_seed(42)

# Distribución uniforme [0, 1)
uniform = torch.rand(3, 3)
print("Uniforme [0, 1):")
print(uniform)

# Distribución normal (media=0, std=1)
normal = torch.randn(3, 3)
print("\\nNormal (0, 1):")
print(normal)

# Enteros aleatorios
integers = torch.randint(low=0, high=10, size=(3, 3))
print("\\nEnteros [0, 10):")
print(integers)`}
        />

        <h3>1.3 Tipos de Datos (dtypes)</h3>
        <CodeBlock
          title="dtypes.py"
          code={`import torch

# Por defecto, float32
t1 = torch.tensor([1.0, 2.0, 3.0])
print(f"Default dtype: {t1.dtype}")

# Especificar dtype
t_float16 = torch.tensor([1.0, 2.0], dtype=torch.float16)
t_float64 = torch.tensor([1.0, 2.0], dtype=torch.float64)
t_int32 = torch.tensor([1, 2, 3], dtype=torch.int32)
t_int64 = torch.tensor([1, 2, 3], dtype=torch.int64)
t_bool = torch.tensor([True, False, True])

print(f"float16: {t_float16.dtype}")
print(f"float64: {t_float64.dtype}")
print(f"int32: {t_int32.dtype}")
print(f"int64: {t_int64.dtype}")
print(f"bool: {t_bool.dtype}")

# Convertir dtype
t_converted = t1.to(torch.float64)
print(f"\\nConvertido a float64: {t_converted.dtype}")`}
        />

        <h3>1.4 Dispositivo (CPU, GPU/CUDA, MPS)</h3>
        <p>
          Para entrenar modelos grandes, necesitamos aceleración por hardware. PyTorch hace esto fácil 
          con el método <code>.to(device)</code>.
        </p>
        <CodeBlock
          title="device_agnostic.py"
          code={`import torch

# Detectar el dispositivo disponible
device = "cpu"
if torch.cuda.is_available():
    device = "cuda" # NVIDIA GPU
elif torch.backends.mps.is_available():
    device = "mps"  # Apple Silicon (M1/M2/M3)

print(f"Usando dispositivo: {device}")

# Crear tensor en CPU
tensor = torch.tensor([1, 2, 3])
print(f"Tensor en: {tensor.device}")

# Mover a GPU (si está disponible)
tensor_on_gpu = tensor.to(device)
print(f"Tensor movido a: {tensor_on_gpu.device}")

# IMPORTANTE: No puedes operar tensores en diferentes dispositivos
# tensor + tensor_on_gpu  # ¡Error!

# Volver a mover a CPU para usar con NumPy
tensor_back_cpu = tensor_on_gpu.cpu()
print(f"De vuelta en: {tensor_back_cpu.device}")`}
        />
      </section>

      {/* Sección 2: Multiplicación Matricial */}
      <section id="matmul" className="section">
        <h2>2. Multiplicación Matricial</h2>

        <div className="concept-box">
          <div className="concept-title">⚡ La Operación Más Importante</div>
          <p style={{ margin: 0 }}>
            La multiplicación matricial es el corazón de las redes neuronales. 
            Cada capa densa realiza: output = input @ weights + bias
          </p>
        </div>

        <CodeBlock
          title="multiplicacion_matricial.py"
          code={`import torch

# Dos formas de multiplicación matricial
A = torch.tensor([[1, 2],
                  [3, 4]])
B = torch.tensor([[5, 6],
                  [7, 8]])

# Método 1: operador @
result1 = A @ B
print("A @ B:")
print(result1)

# Método 2: torch.matmul()
result2 = torch.matmul(A, B)
print("\\ntorch.matmul(A, B):")
print(result2)

# Método 3: torch.mm() (solo 2D)
result3 = torch.mm(A, B)
print("\\ntorch.mm(A, B):")
print(result3)

# Verificar que son iguales
print("\\n¿Todos iguales?", torch.equal(result1, result2) and torch.equal(result2, result3))`}
        />

        <h3>2.1 Reglas de Dimensiones</h3>
        <CodeBlock
          title="reglas_dimensiones.py"
          code={`import torch

# Para A @ B:
# - Última dimensión de A debe coincidir con penúltima de B
# - Resultado: primeras dims de A × últimas dims de B

# (2, 3) @ (3, 4) = (2, 4)
A = torch.randn(2, 3)
B = torch.randn(3, 4)
C = A @ B
print(f"({A.shape}) @ ({B.shape}) = {C.shape}")

# Con batches: (batch, 2, 3) @ (3, 4) = (batch, 2, 4)
batch_A = torch.randn(5, 2, 3)
batch_C = batch_A @ B
print(f"({batch_A.shape}) @ ({B.shape}) = {batch_C.shape}")

# Esto falla: dimensiones incompatibles
# A = torch.randn(2, 3)
# B = torch.randn(5, 4)
# C = A @ B  # Error!`}
        />

        <h3>2.2 Multiplicación Elemento a Elemento</h3>
        <CodeBlock
          title="element_wise.py"
          code={`import torch

A = torch.tensor([[1, 2],
                  [3, 4]])
B = torch.tensor([[5, 6],
                  [7, 8]])

# Multiplicación elemento a elemento (Hadamard product)
hadamard = A * B
print("A * B (elemento a elemento):")
print(hadamard)

# También: torch.mul()
hadamard2 = torch.mul(A, B)
print("\\ntorch.mul(A, B):")
print(hadamard2)`}
        />
      </section>

      {/* Sección 3: Transposición */}
      <section id="transpose" className="section">
        <h2>3. Transposición de Tensores</h2>

        <CodeBlock
          title="transposicion.py"
          code={`import torch

# Tensor 2D (matriz)
A = torch.tensor([[1, 2, 3],
                  [4, 5, 6]])
print("Original A (2x3):")
print(A)

# Método 1: .T (shorthand para 2D)
A_T = A.T
print("\\nA.T:")
print(A_T)

# Método 2: .transpose(dim0, dim1)
A_T2 = A.transpose(0, 1)
print("\\nA.transpose(0, 1):")
print(A_T2)

# Método 3: .t() (solo para 2D)
A_T3 = A.t()
print("\\nA.t():")
print(A_T3)`}
        />

        <h3>3.1 Permute para Tensores Multidimensionales</h3>
        <CodeBlock
          title="permute.py"
          code={`import torch

# Tensor 3D: (batch, height, width)
tensor = torch.randn(2, 3, 4)
print(f"Original shape: {tensor.shape}")

# Reordenar dimensiones
# De (batch, height, width) a (height, width, batch)
permuted = tensor.permute(1, 2, 0)
print(f"Permuted (1, 2, 0) shape: {permuted.shape}")

# Uso común: de (batch, channels, height, width) a (batch, height, width, channels)
image = torch.randn(8, 3, 224, 224)  # Batch de 8 imágenes RGB
print(f"\\nImagen original (NCHW): {image.shape}")

image_nhwc = image.permute(0, 2, 3, 1)
print(f"Imagen permutada (NHWC): {image_nhwc.shape}")`}
        />
      </section>

      {/* Sección 4: Reshape */}
      <section id="reshape" className="section">
        <h2>4. Reshape, View, Flatten, Squeeze</h2>

        <h3>4.1 Reshape y View</h3>
        <CodeBlock
          title="reshape_view.py"
          code={`import torch

# Crear tensor
t = torch.arange(1, 13)  # [1, 2, 3, ..., 12]
print("Original:", t)
print("Shape:", t.shape)

# Reshape a 3x4
reshaped = t.reshape(3, 4)
print("\\nReshape (3, 4):")
print(reshaped)

# View - similar a reshape pero requiere memoria contigua
viewed = t.view(4, 3)
print("\\nView (4, 3):")
print(viewed)

# Usar -1 para inferir una dimensión automáticamente
auto = t.reshape(2, -1)  # -1 se convierte en 6
print("\\nReshape (2, -1):")
print(auto)
print("Shape:", auto.shape)`}
        />

        <h3>4.2 Flatten</h3>
        <CodeBlock
          title="flatten.py"
          code={`import torch

# Tensor 3D
t = torch.randn(2, 3, 4)
print(f"Original shape: {t.shape}")

# Flatten completo - convierte a 1D
flat_complete = t.flatten()
print(f"Flatten completo: {flat_complete.shape}")

# Flatten desde una dimensión específica
flat_from_1 = t.flatten(start_dim=1)
print(f"Flatten desde dim 1: {flat_from_1.shape}")  # (2, 12)

# Flatten entre dos dimensiones
t4d = torch.randn(2, 3, 4, 5)
flat_partial = t4d.flatten(start_dim=1, end_dim=2)
print(f"\\n4D original: {t4d.shape}")
print(f"Flatten dims 1-2: {flat_partial.shape}")  # (2, 12, 5)`}
        />

        <h3>4.3 Squeeze y Unsqueeze</h3>
        <CodeBlock
          title="squeeze_unsqueeze.py"
          code={`import torch

# Squeeze: elimina dimensiones de tamaño 1
t = torch.randn(1, 3, 1, 4, 1)
print(f"Original: {t.shape}")

squeezed = t.squeeze()
print(f"Squeeze (todas): {squeezed.shape}")  # (3, 4)

squeezed_0 = t.squeeze(0)
print(f"Squeeze (dim 0): {squeezed_0.shape}")  # (3, 1, 4, 1)

# Unsqueeze: añade una dimensión de tamaño 1
t2 = torch.randn(3, 4)
print(f"\\nOriginal: {t2.shape}")

unsqueezed = t2.unsqueeze(0)
print(f"Unsqueeze (dim 0): {unsqueezed.shape}")  # (1, 3, 4)

unsqueezed_2 = t2.unsqueeze(2)
print(f"Unsqueeze (dim 2): {unsqueezed_2.shape}")  # (3, 4, 1)`}
        />
      </section>

      {/* Sección 5: Indexing */}
      <section id="indexing" className="section">
        <h2>5. Indexing y Slicing</h2>

        <CodeBlock
          title="indexing_basico.py"
          code={`import torch

# Tensor 2D
t = torch.tensor([[1, 2, 3],
                  [4, 5, 6],
                  [7, 8, 9]])
print("Tensor original:")
print(t)

# Acceder a elementos individuales
print(f"\\nt[0, 0] = {t[0, 0]}")  # 1
print(f"t[1, 2] = {t[1, 2]}")    # 6
print(f"t[-1, -1] = {t[-1, -1]}")  # 9 (último elemento)

# Slicing de filas
print(f"\\nt[0] (primera fila) = {t[0]}")
print(f"t[1:] (desde fila 1) =")
print(t[1:])

# Slicing de columnas
print(f"\\nt[:, 0] (primera columna) = {t[:, 0]}")
print(f"t[:, 1:] (desde columna 1) =")
print(t[:, 1:])`}
        />

        <h3>5.1 Slicing Avanzado</h3>
        <CodeBlock
          title="slicing_avanzado.py"
          code={`import torch

t = torch.arange(24).reshape(4, 6)
print("Tensor 4x6:")
print(t)

# Slicing con paso (step)
print(f"\\nt[::2] (cada 2 filas):")
print(t[::2])

print(f"\\nt[:, ::2] (cada 2 columnas):")
print(t[:, ::2])

# Rango específico
print(f"\\nt[1:3, 2:5]:")
print(t[1:3, 2:5])

# Índices negativos
print(f"\\nt[-2:] (últimas 2 filas):")
print(t[-2:])`}
        />

        <h3>5.2 Boolean Indexing</h3>
        <CodeBlock
          title="boolean_indexing.py"
          code={`import torch

t = torch.randn(4, 4)
print("Tensor original:")
print(t)

# Crear máscara booleana
mask = t > 0
print("\\nMáscara (t > 0):")
print(mask)

# Aplicar máscara
positive_values = t[mask]
print(f"\\nValores positivos: {positive_values}")

# Modificar valores que cumplen condición
t[t < 0] = 0
print("\\nNegativos reemplazados por 0:")
print(t)`}
        />
      </section>

      {/* Sección 6: Concatenación */}
      <section id="concat" className="section">
        <h2>6. Concatenación y Stacking</h2>

        <h3>6.1 torch.cat() - Concatenar</h3>
        <CodeBlock
          title="concatenar.py"
          code={`import torch

A = torch.tensor([[1, 2],
                  [3, 4]])
B = torch.tensor([[5, 6],
                  [7, 8]])

print("A:")
print(A)
print("\\nB:")
print(B)

# Concatenar en dim 0 (verticalmente)
cat_0 = torch.cat([A, B], dim=0)
print("\\ncat dim=0 (vertical):")
print(cat_0)
print(f"Shape: {cat_0.shape}")

# Concatenar en dim 1 (horizontalmente)
cat_1 = torch.cat([A, B], dim=1)
print("\\ncat dim=1 (horizontal):")
print(cat_1)
print(f"Shape: {cat_1.shape}")`}
        />

        <h3>6.2 torch.stack() - Apilar</h3>
        <CodeBlock
          title="apilar.py"
          code={`import torch

A = torch.tensor([[1, 2],
                  [3, 4]])
B = torch.tensor([[5, 6],
                  [7, 8]])

# Stack en dim 0 (nueva primera dimensión)
stacked_0 = torch.stack([A, B], dim=0)
print("Stack dim=0:")
print(stacked_0)
print(f"Shape: {stacked_0.shape}")  # (2, 2, 2)

# Stack en dim 1
stacked_1 = torch.stack([A, B], dim=1)
print("\\nStack dim=1:")
print(stacked_1)
print(f"Shape: {stacked_1.shape}")  # (2, 2, 2)

# Diferencia: cat une a lo largo de una dim existente,
# stack crea una nueva dimensión`}
        />
      </section>

      {/* Sección 7: Tensores Especiales */}
      <section id="special" className="section">
        <h2>7. Tensores Especiales</h2>

        <CodeBlock
          title="tensores_especiales.py"
          code={`import torch

# Identity matrix (matriz identidad)
eye = torch.eye(4)
print("torch.eye(4):")
print(eye)

# Secuencia de números (como range de Python)
arange = torch.arange(0, 10, 2)  # start, end, step
print(f"\\narange(0, 10, 2): {arange}")

# Secuencia con número fijo de pasos
linspace = torch.linspace(0, 1, 5)  # start, end, steps
print(f"linspace(0, 1, 5): {linspace}")

# Secuencia logarítmica
logspace = torch.logspace(0, 2, 3)  # 10^0, 10^1, 10^2
print(f"logspace(0, 2, 3): {logspace}")

# Tensor como otro (misma forma y dtype)
x = torch.randn(2, 3)
zeros_like = torch.zeros_like(x)
ones_like = torch.ones_like(x)
print(f"\\nOriginal shape: {x.shape}")
print(f"zeros_like: {zeros_like.shape}")
print(f"ones_like: {ones_like.shape}")`}
        />

        <h3>7.1 Operaciones Útiles</h3>
        <CodeBlock
          title="operaciones_utiles.py"
          code={`import torch

t = torch.tensor([[1, 2, 3],
                  [4, 5, 6]])

# Suma, media, max, min
print(f"Suma total: {t.sum()}")
print(f"Media: {t.mean().item():.2f}")  # .item() para escalar
print(f"Max: {t.max()}")
print(f"Min: {t.min()}")

# Por dimensión
print(f"\\nSuma por columnas (dim=0): {t.sum(dim=0)}")
print(f"Suma por filas (dim=1): {t.sum(dim=1)}")

# ArgMax - índice del máximo
print(f"\\nArgMax (aplanado): {t.argmax()}")
print(f"ArgMax por fila: {t.argmax(dim=1)}")

# Clamp - limitar valores
t2 = torch.randn(5)
print(f"\\nOriginal: {t2}")
print(f"Clamp [0, 1]: {t2.clamp(0, 1)}")`}
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
        <Link href="/fundamentos-matematicos" className="btn btn-secondary">
          ← Matemáticas
        </Link>
        <Link href="/redes-neuronales" className="btn btn-primary">
          Siguiente: Redes Neuronales →
        </Link>
      </div>
    </div>
  );
}
