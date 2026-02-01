import CodeBlock from "@/components/CodeBlock";
import CollapsibleSection from "@/components/CollapsibleSection";
import InteractiveGraph from "@/components/InteractiveGraph";
import DerivativeGraph from "@/components/DerivativeGraph";
import GradientDescentSimulation from "@/components/GradientDescentSimulation";
import VectorVisualization from "@/components/VectorVisualization";
import Mermaid from "@/components/Mermaid";

export const mdxComponents = {
  CodeBlock,
  CollapsibleSection,
  InteractiveGraph,
  DerivativeGraph,
  GradientDescentSimulation,
  VectorVisualization,
  Mermaid,
  // HTML tags mapping if needed
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-[var(--highlight)]" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-12 mb-4 border-b border-[var(--border)] pb-2 text-[var(--highlight)]" {...props} />,
  p: (props: any) => <div className="mb-4 text-[var(--text-secondary)] leading-relaxed" {...props} />,
  "concept-box": (props: any) => <div className="concept-box my-8" {...props} />,
  "math-block": (props: any) => <div className="math-block" {...props} />,
};
