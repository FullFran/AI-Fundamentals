import { getAllPagesInModule } from "@/lib/mdx";
import Link from "next/link";
import { Icons } from "@/components/Icons";

export default function VisionComputacionalIndex() {
  const moduleName = "vision-computacional";
  const pages = getAllPagesInModule(moduleName);

  return (
    <div className="container max-w-5xl py-12">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[var(--highlight)]/10 rounded-2xl border border-[var(--highlight)]/20">
            <Icons.Eye className="w-10 h-10 text-[var(--highlight)]" />
          </div>
          <h1 className="text-5xl font-black mb-0">Visión Computacional</h1>
        </div>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed text-pretty">
          De las CNNs a los embeddings visuales: la puerta de entrada a los modelos visión-lenguaje.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Link key={page.slug} href={`/${moduleName}/${page.slug}`} className="group">
            <div className="card h-full p-8 border border-[var(--border)] hover:border-[var(--highlight)] transition-all flex flex-col">
              <span className="text-xs font-mono text-[var(--highlight-secondary)] mb-2 uppercase tracking-tighter tabular-nums">
                Fase {page.order}
              </span>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--highlight)] transition-colors">
                {page.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 flex-1 text-sm leading-relaxed">
                Explora el mundo de {page.title.toLowerCase()}.
              </p>
              <span className="text-[var(--highlight)] font-bold text-sm flex items-center gap-2">
                Abrir Fase <Icons.ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
