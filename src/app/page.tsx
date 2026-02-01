import Link from "next/link";
import { Icons } from "@/components/Icons";

const modules = [
  {
    number: 1,
    title: "Fundamentos Físico-Matemáticos",
    description: "Espacios vectoriales, el modelo de Ising, energía de Hopfield y física estadística. La base profunda de la inteligencia.",
    href: "/fundamentos-matematicos",
    icon: <Icons.Math className="w-8 h-8" />,
    topics: ["Álgebra Geométrica", "Modelo de Ising", "Energía y Atractores", "Física Estadística"]
  },
  {
    number: 2,
    title: "Fundamentos de PyTorch",
    description: "Domina los tensores y operaciones fundamentales. PyTorch es el framework estándar para investigación en IA.",
    href: "/pytorch-fundamentals",
    icon: <Icons.Flame className="w-8 h-8" />,
    topics: ["Tensores", "Multiplicación matricial", "Transposición", "Reshape", "Indexing", "Concatenación"]
  },
  {
    number: 3,
    title: "Redes Neuronales desde Cero",
    description: "Construye neuronas, capas y redes completas desde cero. Comprende backpropagation a nivel fundamental.",
    href: "/redes-neuronales",
    icon: <Icons.Cpu className="w-8 h-8" />,
    topics: ["Neurona individual", "Capas densas", "Backpropagation", "Funciones de activación", "Optimizadores"]
  },
  {
    number: 4,
    title: "Visión Computacional",
    description: "Detecta patrones en imágenes con CNNs (Redes Neuronales Convolucionales). Arquitecturas como TinyVGG.",
    href: "/vision-computacional",
    icon: <Icons.Eye className="w-8 h-8" />,
    topics: ["Imágenes NCHW", "Convolución (Conv2d)", "Pooling (MaxPool)", "Arquitectura TinyVGG"]
  },
  {
    number: 5,
    title: "Transformers",
    description: "La arquitectura que revolucionó la IA. Desde el mecanismo de atención hasta GPT.",
    href: "/transformers",
    icon: <Icons.Zap className="w-8 h-8" />,
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--highlight)]/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--highlight-secondary)]/20 rounded-full blur-[128px] animate-pulse delay-700"></div>
        </div>
        
        <h1 className="max-w-4xl mx-auto leading-tight text-balance">
          Conviértete en un Investigador de IA de Élite
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 text-pretty">
          Un camino estructurado desde las matemáticas fundamentales hasta las arquitecturas SOTA, con visualizaciones interactivas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <Link href="/fundamentos-matematicos" className="btn btn-primary text-lg px-8 py-4">
            Comenzar el Viaje
          </Link>
          <Link href="/referencias" className="btn btn-secondary text-lg px-8 py-4 flex items-center gap-2">
            <Icons.Book className="w-5 h-5" /> Bibliografía
          </Link>
        </div>
      </section>

      {/* Ruta de Aprendizaje */}
      <section className="container">
        <h2 className="text-center md:text-left">Ruta de Aprendizaje</h2>
        
        <div className="concept-box mb-12">
          <h3 className="text-[var(--highlight)] mt-0 mb-2">Filosofía Bottom-Up</h3>
          <p className="m-0 text-lg">
            No usamos librerías de alto nivel hasta que entendemos cómo funcionan por dentro. 
            Construimos intuición antes de abstracción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <Link key={module.number} href={module.href} className="group">
              <div className="card h-full relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 p-6 text-[var(--highlight)] opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                  {module.icon}
                </div>
                <div className="w-12 h-12 bg-[var(--highlight)] text-[var(--primary)] rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-cyan-500/20">
                  {module.number}
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-[var(--highlight)] transition-colors">
                  {module.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 line-clamp-3">
                  {module.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {module.topics.slice(0, 4).map((topic, idx) => (
                    <span 
                      key={idx}
                      className="bg-[var(--highlight)]/10 text-[var(--highlight)] px-3 py-1 rounded-full text-xs font-semibold border border-[var(--highlight)]/20"
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

      {/* Lo que Aprenderás */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mt-0">Objetivos del Curso</h2>
            <p className="text-lg mb-8">
              Este curso está diseñado para aquellos que no se conforman con usar modelos, sino que quieren crearlos y entenderlos a nivel de investigación.
            </p>
            <ul className="space-y-4">
              {outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-[var(--border)] group hover:border-[var(--success)]/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center text-sm">✓</span>
                  <span className="text-[var(--text-primary)] font-medium">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square max-w-md mx-auto lg:ml-auto">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--highlight)] to-[var(--highlight-secondary)] rounded-3xl rotate-3 opacity-20 blur-2xl animate-pulse"></div>
             <div className="relative card h-full flex flex-col items-center justify-center p-12 text-center">
                <Icons.Brain className="w-16 h-16 text-[var(--highlight)] mb-6" />
                <h3 className="text-3xl mb-4 italic">"De cero a Investigador"</h3>
                <p className="text-[var(--text-secondary)] text-pretty">Un viaje riguroso pero intuitivo hacia la frontera del conocimiento.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container py-24">
        <div className="card text-center bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] border-[var(--highlight)]/30 py-16">
          <h2 className="mt-0 border-none mb-6">¿Preparado para el desafío?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-[var(--text-secondary)]">
            Comienza hoy mismo con los fundamentos matemáticos y desbloquea el verdadero poder del Deep Learning.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fundamentos-matematicos" className="btn btn-primary text-lg px-10 py-4">
              Comenzar ahora →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
