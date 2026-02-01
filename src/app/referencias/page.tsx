import Link from "next/link";

export default function Referencias() {
  return (
    <div className="container">
      <h1>📚 Referencias y Recursos</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
        La investigación en IA se basa en la lectura de papers. Aquí están los trabajos fundamentales 
        que cubren los conceptos de este curso.
      </p>

      {/* Papers Fundamentales */}
      <section className="section">
        <h2>📄 Papers Fundamentales</h2>
        
        <div className="reference">
          <div className="reference-icon">⚡</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">
                Attention Is All You Need
              </a>
            </div>
            <div className="reference-authors">Vaswani et al., 2017</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              El paper que introdujo la arquitectura Transformer. Lectura obligatoria.
            </p>
          </div>
        </div>

        <div className="reference">
          <div className="reference-icon">🧱</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://arxiv.org/abs/1512.03385" target="_blank" rel="noopener noreferrer">
                Deep Residual Learning for Image Recognition
              </a>
            </div>
            <div className="reference-authors">He et al., 2015</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              Introdujo las conexiones residuales (ResNet), esenciales para entrenar redes profundas 
              y componente clave del Transformer.
            </p>
          </div>
        </div>

        <div className="reference">
          <div className="reference-icon">🔍</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://arxiv.org/abs/1607.06450" target="_blank" rel="noopener noreferrer">
                Layer Normalization
              </a>
            </div>
            <div className="reference-authors">Ba et al., 2016</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              Técnica de normalización utilizada en los Transformers para estabilizar el entrenamiento.
            </p>
          </div>
        </div>

        <div className="reference">
          <div className="reference-icon">📈</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://arxiv.org/abs/1412.6980" target="_blank" rel="noopener noreferrer">
                Adam: A Method for Stochastic Optimization
              </a>
            </div>
            <div className="reference-authors">Kingma & Ba, 2014</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              El optimizador estándar utilizado en la mayoría de entrenamientos de Transformers.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Recomendados */}
      <section className="section">
        <h2>🎬 Videos Recomendados</h2>
        
        <div className="reference">
          <div className="reference-icon">📺</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://youtu.be/W8g1hvW4Wic?si=ASzvkAGzZkrsCv5R" target="_blank" rel="noopener noreferrer">
                Backpropagation from scratch
              </a>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              Explicación detallada del algoritmo de retropropagación (referencia del módulo 3).
            </p>
          </div>
        </div>

        <div className="reference">
          <div className="reference-icon">🔥</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://youtu.be/vC5JNpw1k-k" target="_blank" rel="noopener noreferrer">
                torch.backward() Explained Step by Step
              </a>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              Entendiendo qué hace realmente la función .backward() en PyTorch.
            </p>
          </div>
        </div>

        <div className="reference">
          <div className="reference-icon">🧠</div>
          <div className="reference-content">
            <div className="reference-title">
              <a href="https://youtu.be/oth4Wop6yew" target="_blank" rel="noopener noreferrer">
                Neural Network example & training
              </a>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
              Ejemplo práctico de entrenamiento de una red neuronal.
            </p>
          </div>
        </div>
      </section>

      {/* Recursos Adicionales */}
      <section className="section">
        <h2>🛠️ Recursos Adicionales</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--highlight)' }}>PyTorch</h3>
            <p>Documentación oficial de PyTorch, la mejor fuente para dudas de implementación.</p>
            <a href="https://pytorch.org/docs/stable/index.html" target="_blank" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              Ir a Docs →
            </a>
          </div>
          
          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--highlight)' }}>Papers with Code</h3>
            <p>La mejor web para encontrar el estado del arte (SOTA) en diferentes tareas de IA.</p>
            <a href="https://paperswithcode.com/" target="_blank" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              Explorar →
            </a>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--highlight)' }}>Andrej Karpathy</h3>
            <p>Sus videos &quot;Zero to Hero&quot; son la inspiración para este estilo de enseñanza.</p>
            <a href="https://karpathy.ai/zero-to-hero.html" target="_blank" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              Ver Curso →
            </a>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--highlight)' }}>CNN Explainer</h3>
            <p>Visualización interactiva de cómo funcionan las capas convolucionales.</p>
            <a href="https://poloclub.github.io/cnn-explainer/" target="_blank" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              Ver Demo →
            </a>
          </div>
        </div>
      </section>

      {/* Navegación al inicio */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingTop: '3rem', 
        borderTop: '1px solid var(--border)' 
      }}>
        <h2 style={{ borderBottom: 'none', marginBottom: '1.5rem' }}>¡Has completado el recorrido!</h2>
        <p style={{ marginBottom: '2rem' }}>
          Ahora tienes el mapa completo. Es hora de abrir los notebooks y escribir código.
        </p>
        <Link href="/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          🏠 Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
