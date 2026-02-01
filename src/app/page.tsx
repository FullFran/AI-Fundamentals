import Link from "next/link";

const modules = [
  {
    number: 1,
    title: "Fundamentos Matemáticos",
    description: "Funciones, derivadas, vectores, gradientes, matrices y probabilidad. La base matemática esencial para entender el deep learning.",
    href: "/fundamentos-matematicos",
    icon: "🧮",
    topics: ["Funciones matemáticas", "Derivadas", "Vectores", "Gradientes", "Matrices", "Probabilidad"]
  },
  {
    number: 2,
    title: "Fundamentos de PyTorch",
    description: "Domina los tensores y operaciones fundamentales. PyTorch es el framework estándar para investigación en IA.",
    href: "/pytorch-fundamentals",
    icon: "🔥",
    topics: ["Tensores", "Multiplicación matricial", "Transposición", "Reshape", "Indexing", "Concatenación"]
  },
  {
    number: 3,
    title: "Redes Neuronales desde Cero",
    description: "Construye neuronas, capas y redes completas desde cero. Comprende backpropagation a nivel fundamental.",
    href: "/redes-neuronales",
    icon: "🧠",
    topics: ["Neurona individual", "Capas densas", "Backpropagation", "Funciones de activación", "Optimizadores"]
  },
  {
    number: 4,
    title: "Visión Computacional",
    description: "Detecta patrones en imágenes con CNNs (Redes Neuronales Convolucionales). Arquitecturas como TinyVGG.",
    href: "/vision-computacional",
    icon: "👁️",
    topics: ["Imágenes NCHW", "Convolución (Conv2d)", "Pooling (MaxPool)", "Arquitectura TinyVGG"]
  },
  {
    number: 5,
    title: "Transformers",
    description: "La arquitectura que revolucionó la IA. Desde el mecanismo de atención hasta GPT.",
    href: "/transformers",
    icon: "⚡",
    topics: ["Mecanismo de atención", "Self-Attention", "Multi-Head Attention", "Decoder-Only Transformer"]
  }
];

const outcomes = [
  "Comprender las matemáticas de redes neuronales profundamente",
  "Manipular tensores con fluidez en PyTorch",
  "Implementar redes desde cero",
  "Leer e implementar papers de investigación",
  "Depurar problemas de entrenamiento efectivamente"
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Curso Introductorio de Investigación en IA
        </h1>
        <p className="hero-subtitle">
          Un curso para aprender los fundamentos de la inteligencia artificial, desde las matemáticas básicas 
          hasta los Transformers, con visualizaciones interactivas.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/fundamentos-matematicos" className="btn btn-primary">
            🚀 Comenzar el Curso
          </Link>
          <Link href="/referencias" className="btn btn-secondary">
            📚 Ver Referencias
          </Link>
        </div>
      </section>

      {/* Ruta de Aprendizaje */}
      <section className="container">
        <h2>🎯 Ruta de Aprendizaje</h2>
        
        <div className="concept-box">
          <div className="concept-title">Enfoque Bottom-Up</div>
          <p style={{ margin: 0 }}>
            Este curso utiliza un enfoque de abajo hacia arriba: primero los fundamentos, 
            luego construimos hacia arriba. Esto desarrolla una comprensión verdadera y 
            permite la investigación independiente.
          </p>
        </div>

        <div className="modules-grid">
          {modules.map((module) => (
            <Link key={module.number} href={module.href} style={{ textDecoration: 'none' }}>
              <div className="module-card">
                <div className="module-number">{module.number}</div>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{module.icon}</div>
                <h3 className="module-title" style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                  {module.title}
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                  {module.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {module.topics.slice(0, 4).map((topic, idx) => (
                    <span 
                      key={idx}
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--highlight)'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo Progresar */}
      <section className="container">
        <h2>📖 Cómo Progresar</h2>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--highlight)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>1️⃣</span> Sigue el orden secuencial
              </h4>
              <p>Completa cada fase antes de pasar a la siguiente.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--highlight)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>2️⃣</span> Practica activamente
              </h4>
              <p>Ejecuta, modifica y experimenta con el código.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--highlight)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>3️⃣</span> Enfócate en entender
              </h4>
              <p>Comprende el <em>por qué</em> las cosas funcionan, no solo el <em>cómo</em>.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--highlight)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>4️⃣</span> No te apresures
              </h4>
              <p>Las lagunas en los fundamentos se amplificarán después.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="container">
        <h2>🚀 Lo que Aprenderás</h2>
        <div className="card">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {outcomes.map((outcome, idx) => (
              <li 
                key={idx} 
                style={{ 
                  padding: '0.75rem 0',
                  borderBottom: idx < outcomes.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ color: 'var(--success)', fontSize: '1.25rem' }}>✓</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Requisitos */}
      <section className="container">
        <h2>📋 Requisitos Previos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="card">
            <h4 style={{ color: 'var(--success)', marginTop: 0 }}>✅ Necesarios</h4>
            <ul>
              <li>Conocimientos básicos de Python</li>
              <li>Álgebra de secundaria</li>
              <li>Ganas de aprender</li>
            </ul>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--warning)', marginTop: 0 }}>💡 Recomendados</h4>
            <ul>
              <li>Familiaridad con NumPy</li>
              <li>Conceptos básicos de cálculo</li>
              <li>Experiencia con Jupyter Notebooks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ borderBottom: 'none' }}>¿Listo para comenzar?</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '500px', margin: '1rem auto 2rem' }}>
          Empieza con los fundamentos matemáticos y construye tu camino hacia la investigación en IA.
        </p>
        <Link href="/fundamentos-matematicos" className="btn btn-primary">
          Comenzar con Matemáticas →
        </Link>
      </section>
    </div>
  );
}
