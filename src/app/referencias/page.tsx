import Link from "next/link";

const refs = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al., 2017",
    desc: "El nacimiento de los Transformers. El paper más influyente de la última década.",
    link: "https://arxiv.org/abs/1706.03762",
    icon: "⚡"
  },
  {
    title: "Deep Residual Learning (ResNet)",
    authors: "He et al., 2015",
    desc: "Cómo entrenar redes de cientos de capas usando conexiones residuales.",
    link: "https://arxiv.org/abs/1512.03385",
    icon: "🧱"
  },
  {
    title: "Adam Optimizer",
    authors: "Kingma & Ba, 2014",
    desc: "El optimizador estándar por defecto en casi todos los proyectos modernos.",
    link: "https://arxiv.org/abs/1412.6980",
    icon: "📈"
  }
];

export default function Referencias() {
  return (
    <div className="container max-w-4xl">
      <header className="mb-16 text-center">
        <h1 className="mb-4">📚 Bibliografía y Recursos</h1>
        <p className="text-xl text-[var(--text-secondary)]">
          La ciencia avanza a hombros de gigantes. Estos son los pilares de la investigación en IA moderna.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="border-none text-2xl mb-8">Papers Fundamentales</h2>
        {refs.map((ref, i) => (
          <a 
            key={i} 
            href={ref.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block card p-6 group hover:border-[var(--highlight)] transition-all"
          >
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {ref.icon}
              </div>
              <div>
                <h3 className="mt-0 text-lg group-hover:text-[var(--highlight)] transition-colors">{ref.title}</h3>
                <p className="text-xs font-mono text-[var(--highlight-secondary)] mb-2 uppercase tracking-tighter">{ref.authors}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-0">{ref.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </section>

      <section className="mt-24">
        <div className="card bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] border-[var(--highlight)]/20 p-12 text-center">
           <h2 className="mt-0 border-none text-[var(--highlight)]">¿Quieres ir más allá?</h2>
           <p className="text-lg mb-10">Explora el código fuente y las notas detalladas en mi repositorio de investigación.</p>
           <div className="flex justify-center">
             <a href="https://github.com" target="_blank" className="btn btn-primary px-10">
                ⭐ GitHub del Proyecto
             </a>
           </div>
        </div>
      </section>

      <footer className="text-center mt-24 py-12 border-t border-[var(--border)]">
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--highlight)] flex items-center justify-center gap-2 transition-colors font-medium">
           <span>🏠</span> Volver al inicio del curso
        </Link>
      </footer>
    </div>
  );
}
