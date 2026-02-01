import { getPageData, getAllPagesInModule } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "@/components/Icons";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface PageProps {
  params: Promise<{
    module: string;
    slug: string;
  }>;
}

export default async function WikiPage({ params }: PageProps) {
  const { module, slug } = await params;
  
  try {
    const { metadata, content, navigation } = getPageData(module, slug);
    const siblings = getAllPagesInModule(module);
    
    return (
      <div className="min-h-screen bg-[var(--primary)]">
        {/* Progress bar at the top */}
        <div className="fixed top-16 left-0 w-full h-1 bg-[var(--border)] z-40">
           <div 
             className="h-full bg-gradient-to-r from-[var(--highlight)] to-[var(--highlight-secondary)] transition-all duration-500" 
             style={{ width: `${(metadata.order / siblings.length) * 100}%` }}
           ></div>
        </div>

        <div className="container max-w-7xl flex flex-col lg:flex-row gap-12 py-20">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <Link 
                href={`/${module}`} 
                className="group flex items-center gap-2 text-sm font-bold text-[var(--highlight)] mb-8 hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                {module.replace(/-/g, ' ')}
              </Link>
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4 opacity-50">
                Lecciones del módulo
              </h3>
              
              <nav className="flex flex-col gap-1 tabular-nums">
                {siblings.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${module}/${page.slug}`}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      page.slug === slug
                        ? "bg-[var(--highlight)]/10 text-[var(--highlight)] font-bold border border-[var(--highlight)]/20 shadow-lg shadow-cyan-500/5"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                    }`}
                  >
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] border ${
                      page.slug === slug 
                        ? "bg-[var(--highlight)] text-[var(--primary)] border-[var(--highlight)]" 
                        : "border-[var(--border)] group-hover:border-[var(--text-secondary)]"
                    }`}>
                      {page.order}
                    </span>
                    {page.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 max-w-3xl">
            <article className="prose prose-invert prose-cyan max-w-none">
              <header className="mb-16">
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--highlight-secondary)] mb-4 uppercase tracking-widest font-bold tabular-nums">
                  <span>Módulo {module.replace(/-/g, ' ')}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span>Parte {metadata.order} de {siblings.length}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent text-balance">
                  {metadata.title}
                </h1>
                {metadata.description && (
                  <p className="text-xl text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--highlight)]/30 pl-6">
                    {metadata.description}
                  </p>
                )}
              </header>

          <div className="mdx-content">
            <MDXRemote 
              source={content} 
              components={mdxComponents} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                }
              }}
            />
          </div>


              {/* Navigation Footer */}
              <footer className="mt-24 pt-12 border-t border-[var(--border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 tabular-nums">
                  {navigation.prev ? (
                    <Link 
                      href={`/${module}/${navigation.prev.slug}`}
                      className="group flex flex-col gap-2 p-6 rounded-2xl border border-[var(--border)] bg-white/5 hover:border-[var(--highlight)]/50 transition-all text-left"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Lección Anterior</span>
                      <span className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--highlight)] transition-colors flex items-center gap-2">
                        <Icons.ChevronRight className="w-5 h-5 rotate-180" /> {navigation.prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden md:block"></div>
                  )}

                  {navigation.next ? (
                    <Link 
                      href={`/${module}/${navigation.next.slug}`}
                      className="group flex flex-col gap-2 p-6 rounded-2xl border border-[var(--highlight)]/30 bg-gradient-to-br from-[var(--highlight)]/10 to-transparent hover:border-[var(--highlight)] transition-all text-right"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--highlight)]">Siguiente Lección</span>
                      <span className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--highlight)] transition-colors flex items-center justify-end gap-2">
                        {navigation.next.title} <Icons.ChevronRight className="w-5 h-5" />
                      </span>
                    </Link>
                  ) : (
                    <Link 
                      href={`/${module}`}
                      className="group flex flex-col gap-2 p-6 rounded-2xl border border-[var(--success)]/30 bg-gradient-to-br from-[var(--success)]/10 to-transparent hover:border-[var(--success)] transition-all text-right"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--success)]">¡Módulo Completado!</span>
                      <span className="font-bold text-lg text-[var(--text-primary)]">
                        Volver al Índice 🎉
                      </span>
                    </Link>
                  )}
                </div>
              </footer>
            </article>
          </main>
        </div>
      </div>
    );
  } catch (e) {
    notFound();
  }
}

export async function generateStaticParams() {
  const fs = require('fs');
  const path = require('path');
  const contentPath = path.join(process.cwd(), 'src/content');
  
  if (!fs.existsSync(contentPath)) return [];
  
  const modules = fs.readdirSync(contentPath);
  const params: any[] = [];

  modules.forEach((module: string) => {
    const modulePath = path.join(contentPath, module);
    if (fs.statSync(modulePath).isDirectory()) {
      const files = fs.readdirSync(modulePath);
      files.forEach((file: string) => {
        if (file.endsWith('.mdx')) {
          params.push({
            module: module,
            slug: file.replace('.mdx', ''),
          });
        }
      });
    }
  });

  return params;
}
