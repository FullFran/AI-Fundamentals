"use client";

import React, { useEffect, useState, useId } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState("");
  const [hasError, setHasError] = useState(false);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "var(--font-mono)",
      themeVariables: {
        primaryColor: "#00d4ff15",
        primaryTextColor: "#f8fafc",
        primaryBorderColor: "#00d4ff",
        lineColor: "#00d4ff",
        secondaryColor: "#7c3aed",
        tertiaryColor: "#0a0a1a",
        mainBkg: "#0f172a",
        nodeBorder: "#1e293b",
        clusterBkg: "rgba(0, 212, 255, 0.05)",
        clusterBorder: "rgba(0, 212, 255, 0.2)",
        edgeLabelBackground: "#0a0a1a",
        fontSize: "14px"
      },
    });

    const renderChart = async () => {
      if (!chart) return;
      
      // Limpiar el texto del chart
      const cleanChart = chart
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/\\n/g, "\n")
        .trim();

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, cleanChart);
        setSvg(svg);
        setHasError(false);
      } catch (error) {
        console.error("Mermaid render error:", error);
        setHasError(true);
      }
    };

    renderChart();
  }, [chart, id]);

  if (hasError) {
    return (
      <div className="my-8 p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono flex flex-col gap-2">
        <div className="font-bold flex items-center gap-2">
           <span>⚠️</span> Error de Sintaxis en el Diagrama
        </div>
        <pre className="opacity-70 overflow-x-auto p-2 bg-black/20 rounded">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="mermaid-wrapper my-12 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/20 p-8 md:p-12 transition-all hover:bg-slate-900/40">
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
