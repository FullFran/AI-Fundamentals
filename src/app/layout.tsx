import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        <main style={{ paddingTop: '70px' }}>
          {children}
        </main>
        <footer className="footer">
          <p>🧠 Curso de Investigador en IA de Élite</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Basado en el repositorio <a href="https://github.com" target="_blank" rel="noopener noreferrer">Become Elite AI Researcher</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
