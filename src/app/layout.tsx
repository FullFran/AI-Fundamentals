import { Inter, Fira_Code } from "next/font/google";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Curso de Investigador en IA de Élite",
  description: "Aprende a convertirte en un investigador de inteligencia artificial desde cero. Matemáticas, PyTorch, Redes Neuronales y Transformers.",
  keywords: ["IA", "Inteligencia Artificial", "Machine Learning", "Deep Learning", "PyTorch", "Transformers", "Redes Neuronales"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="antialiased min-h-screen selection:bg-[var(--highlight)]/30 selection:text-[var(--highlight)]">
        <Navigation />
        <main className="pt-16 min-h-[calc(100vh-160px)] outline-none" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="footer py-12 px-6 border-t border-[var(--border)] text-center">
          <p className="font-bold text-lg mb-2">🧠 Curso de Investigador en IA de Élite</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Basado en el repositorio <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--highlight)] hover:underline">Become Elite AI Researcher</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
