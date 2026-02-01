import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function Transformers() {
  return (
    <div className="container">
      <h1>⚡ Transformers</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        La arquitectura que cambió todo. Desde &quot;Attention Is All You Need&quot; (2017), los Transformers 
        dominan el procesamiento de lenguaje natural (NLP). Aquí entenderás cómo construirlos pieza por pieza.
      </p>

      {/* Tabla de Contenidos */}
      <div className="toc">
        <div className="toc-title">📑 Contenido</div>
        <ul className="toc-list">
          <li className="toc-item"><a href="#atencion">1. El Mecanismo de Atención</a></li>
          <li className="toc-item"><a href="#self-attention">2. Self-Attention</a></li>
          <li className="toc-item"><a href="#multi-head">3. Multi-Head Attention</a></li>
          <li className="toc-item"><a href="#decoder">4. Decoder-Only Transformer (GPT)</a></li>
        </ul>
      </div>

      {/* Sección 1: El Mecanismo de Atención */}
      <section id="atencion" className="section">
        <h2>1. El Mecanismo de Atención</h2>
        
        <div className="concept-box">
          <div className="concept-title">💡 La Idea Central</div>
          <p style={{ margin: 0 }}>
            La atención permite al modelo "enfocarse" en partes relevantes de la entrada al generar una salida. 
            Es una suma ponderada de valores, donde los pesos dependen de la similitud entre una "consulta" 
            y las "claves".
          </p>
        </div>

        <CodeBlock
          title="atencion_basica.py"
          code={`import torch
import torch.nn.functional as F

# Supongamos:
# query (Q): lo que busco
# key (K): lo que tengo (etiquetas)
# value (V): el contenido real

# Dimensiones: (batch_size, seq_len, d_model)
batch_size = 1
seq_len = 3
d_model = 4

torch.manual_seed(42)
Q = torch.randn(batch_size, seq_len, d_model)
K = torch.randn(batch_size, seq_len, d_model)
V = torch.randn(batch_size, seq_len, d_model)

def scaled_dot_product_attention(q, k, v):
    d_k = q.size(-1)
    
    # 1. Calcular scores: Q · K^T
    # (batch, seq, d) · (batch, d, seq) -> (batch, seq, seq)
    scores = torch.matmul(q, k.transpose(-2, -1))
    
    # 2. Escalar por raíz de d_k (estabilidad)
    scaled_scores = scores / (d_k ** 0.5)
    
    # 3. Softmax para obtener pesos de atención
    # Los pesos suman 1 para cada posición
    attention_weights = F.softmax(scaled_scores, dim=-1)
    
    # 4. Suma ponderada de valores
    # (batch, seq, seq) · (batch, seq, d) -> (batch, seq, d)
    output = torch.matmul(attention_weights, v)
    
    return output, attention_weights

output, weights = scaled_dot_product_attention(Q, K, V)

print("Attention Weights (quien mira a quien):")
print(weights[0])
print("\\nSalida (contexto mezclado):")
print(output[0])`}
        />
      </section>

      {/* Sección 2: Self-Attention */}
      <section id="self-attention" className="section">
        <h2>2. Self-Attention (Auto-atención)</h2>
        
        <p>
          En Self-Attention, Q, K y V provienen de la misma fuente (la secuencia de entrada). 
          Esto permite que cada palabra en una frase atienda a todas las otras palabras de la misma frase 
          para entender el contexto.
        </p>

        <CodeBlock
          title="self_attention.py"
          code={`import torch.nn as nn

class SelfAttentionHead(nn.Module):
    def __init__(self, d_model, d_head):
        super().__init__()
        self.d_head = d_head
        
        # Proyecciones lineales aprendibles
        # Transforman la entrada x en Q, K, V
        self.w_q = nn.Linear(d_model, d_head, bias=False)
        self.w_k = nn.Linear(d_model, d_head, bias=False)
        self.w_v = nn.Linear(d_model, d_head, bias=False)
        
    def forward(self, x):
        # x shape: (batch, seq_len, d_model)
        
        # Proyectar
        q = self.w_q(x) # -> (batch, seq_len, d_head)
        k = self.w_k(x)
        v = self.w_v(x)
        
        # Calcular atención (igual que antes)
        scores = torch.matmul(q, k.transpose(-2, -1)) / (self.d_head ** 0.5)
        # (Aquí es donde se aplicaría una máscara causal para GPT)
        weights = F.softmax(scores, dim=-1)
        out = torch.matmul(weights, v)
        
        return out

# Ejemplo
d_model = 8  # Dimensión de entrada
d_head = 4   # Dimensión de la cabeza
x = torch.randn(1, 5, d_model) # Frase de 5 palabras

head = SelfAttentionHead(d_model, d_head)
out = head(x)
print(f"Entrada: {x.shape} -> Salida: {out.shape}")`}
        />
      </section>

      {/* Sección 3: Multi-Head Attention */}
      <section id="multi-head" className="section">
        <h2>3. Multi-Head Attention</h2>
        
        <div className="concept-box">
          <div className="concept-title">👀 Múltiples Perspectivas</div>
          <p style={{ margin: 0 }}>
            Una sola cabeza de atención puede enfocarse en un aspecto (ej: quién hizo la acción). 
            Tener múltiples cabezas permite al modelo atender a diferentes tipos de relaciones simultáneamente 
            (quién, cuándo, dónde, gramática, etc.).
          </p>
        </div>

        <CodeBlock
          title="multi_head.py"
          code={`class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        
        # Proyecciones combinadas (más eficiente que n capas separadas)
        self.w_q = nn.Linear(d_model, d_model, bias=False)
        self.w_k = nn.Linear(d_model, d_model, bias=False)
        self.w_v = nn.Linear(d_model, d_model, bias=False)
        
        # Proyección final
        self.w_out = nn.Linear(d_model, d_model)
        
    def forward(self, x):
        batch, seq, d_model = x.shape
        
        # 1. Proyectar y dividir en cabezas
        # (batch, seq, d_model) -> (batch, seq, n_heads, d_head)
        # Luego transponer a (batch, n_heads, seq, d_head) para matmul
        q = self.w_q(x).view(batch, seq, self.n_heads, self.d_head).transpose(1, 2)
        k = self.w_k(x).view(batch, seq, self.n_heads, self.d_head).transpose(1, 2)
        v = self.w_v(x).view(batch, seq, self.n_heads, self.d_head).transpose(1, 2)
        
        # 2. Atención escalada (en paralelo para todas las cabezas)
        # scores: (batch, n_heads, seq, seq)
        scores = torch.matmul(q, k.transpose(-2, -1)) / (self.d_head ** 0.5)
        weights = F.softmax(scores, dim=-1)
        # out: (batch, n_heads, seq, d_head)
        out = torch.matmul(weights, v)
        
        # 3. Concatenar cabezas
        # (batch, n_heads, seq, d_head) -> (batch, seq, n_heads * d_head) = (batch, seq, d_model)
        out = out.transpose(1, 2).contiguous().view(batch, seq, d_model)
        
        # 4. Proyección final
        return self.w_out(out)

mha = MultiHeadAttention(d_model=16, n_heads=4)
x = torch.randn(1, 10, 16)
output = mha(x)
print(f"Multi-Head Output: {output.shape}")`}
        />
      </section>

      {/* Sección 4: Decoder-Only Transformer */}
      <section id="decoder" className="section">
        <h2>4. Decoder-Only Transformer (Estilo GPT)</h2>
        
        <p>
          Los modelos como GPT (Generative Pre-trained Transformer) utilizan una arquitectura 
          "decoder-only". La clave es el <strong>enmascaramiento causal</strong> (masked attention), 
          que impide que el modelo vea tokens futuros al predecir el siguiente.
        </p>

        <CodeBlock
          title="decoder_block.py"
          code={`class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, n_heads)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        
        # Feed Forward Network (MLP)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, 4 * d_model),
            nn.GELU(),
            nn.Linear(4 * d_model, d_model)
        )
        
    def forward(self, x):
        # Conexión residual + LayerNorm
        # x = x + Attention(Norm(x))
        x = x + self.attention(self.norm1(x))
        
        # x = x + FFN(Norm(x))
        x = x + self.ffn(self.norm2(x))
        return x

class GPT(nn.Module):
    def __init__(self, vocab_size, d_model, n_layers, n_heads):
        super().__init__()
        self.token_embedding = nn.Embedding(vocab_size, d_model)
        self.position_embedding = nn.Embedding(512, d_model) # Posicional
        
        self.blocks = nn.Sequential(*[
            TransformerBlock(d_model, n_heads) for _ in range(n_layers)
        ])
        
        self.ln_f = nn.LayerNorm(d_model) # Normalización final
        self.head = nn.Linear(d_model, vocab_size) # Predicción de token
        
    def forward(self, idx):
        # idx: índices de tokens (batch, seq)
        batch, seq = idx.shape
        
        # Embeddings
        tok_emb = self.token_embedding(idx)
        pos_emb = self.position_embedding(torch.arange(seq, device=idx.device))
        x = tok_emb + pos_emb
        
        # Transformer blocks
        x = self.blocks(x)
        
        # Output head
        x = self.ln_f(x)
        logits = self.head(x)
        return logits

# Modelo GPT miniatura
model = GPT(vocab_size=1000, d_model=32, n_layers=2, n_heads=4)
print(model)`}
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
        <Link href="/referencias" className="btn btn-primary">
          Referencias y Recursos →
        </Link>
      </div>
    </div>
  );
}
