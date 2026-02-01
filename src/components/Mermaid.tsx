"use client";

import React, { useEffect, useState, useId } from "react";
import mermaid from "mermaid";

// Inicialización global (solo una vez)
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    fontFamily: "var(--font-mono)",
    themeVariables: {
      primaryColor: "#1e293b",
      primaryTextColor: "#f8fafc",
      primaryBorderColor: "#00d4ff",
      lineColor: "#00d4ff",
      secondaryColor: "#7c3aed",
      tertiaryColor: "#0a0a1a",
      mainBkg: "#0a0a1a",
      nodeBorder: "#1e293b",
      clusterBkg: "#1e293b",
      clusterBorder: "#334155",
      edgeLabelBackground: "#0a0a1a",
    },
  });
}

interface MermaidProps {
  children: string;
}

export default function Mermaid({ children }: MermaidProps) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const renderChart = async () => {
      // Limpieza profunda del texto
      const chartDefinition = children
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/\\n/g, "\n")
        .trim();

      if (!chartDefinition) return;

      try {
        // Usamos la API moderna de Mermaid
        const { svg } = await mermaid.render(`mermaid-${id}`, chartDefinition);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setError("Error de sintaxis en el diagrama. Revisa la consola para más detalles.");
      }
    };

    renderChart();
  }, [children, id]);

  if (error) {
    return (
      <div className="my-8 p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono">
        <div className="font-bold mb-2 flex items-center gap-2">
           <span>⚠️</span> {error}
        </div>
        <pre className="opacity-50 whitespace-pre-wrap">{children}</pre>
      </div>
    );
  }

  return (
    <div className="mermaid-wrapper my-12 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/20 p-8 md:p-12 transition-all hover:bg-slate-900/30">
      {!svg && (
        <div className="flex justify-center items-center h-32 animate-pulse text-[var(--text-secondary)] text-sm font-mono tracking-tighter uppercase">
          Renderizando arquitectura...
        </div>
      )}
      <div 
        className="flex justify-center transition-opacity duration-500"
        style={{ opacity: svg ? 1 : 0 }}
        dangerouslySetInnerHTML={{ __html: svg }} 
      />
    </div>
  );
}
