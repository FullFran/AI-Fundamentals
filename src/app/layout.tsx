import { Inter, Fira_Code } from "next/font/google";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Fundamentos de IA",
  description: "Entiende la IA desde sus fundamentos: matemáticas, PyTorch, redes neuronales y transformers.",
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
          <p className="font-bold text-lg mb-2">🧠 Fundamentos de IA</p>
        </footer>
      </body>
    </html>
  );
}
