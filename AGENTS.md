# AGENTS.md - Guide for Agentic Coding

This document serves as a reference for AI agents (like yourself) operating in the `AI-Fundamentals` repository. Adhere to these guidelines to maintain consistency and quality across the codebase.

## Project Overview
An educational Next.js 16 (App Router) project focused on AI fundamentals. It follows a **Bottom-Up** philosophy: understanding starts with basic Mathematics, then moves to PyTorch, Neural Networks, CNNs, and finally Transformers. The site emphasizes interactive visualizations and high-quality educational content in Spanish.

The core goal is to build intuition before abstraction. Every module should provide a visual way to experiment with the concepts being taught.

## Key References
- **LLM from Scratch:** Many implementations and concepts are referenced from the project located at `/home/franblakia/fullfran/ia-learning/llm-from-scratch`. 
- **Internal Reference Alias:** A physical copy of this reference is available at `llm-ref/`. You can use the TypeScript alias `@llm-ref/*` to reference these files. Consult this directory for foundational code patterns and deep-dive explanations.

## Build/Lint/Test Commands

| Action | Command |
| :--- | :--- |
| **Install Dependencies** | `npm install` |
| **Development Server** | `npm run dev` |
| **Build Project** | `npm run build` |
| **Lint Code** | `npm run lint` |
| **Type Check** | `npx tsc --noEmit` |
| **Clean Build** | `rm -rf .next/ out/ build/` |

> **Note on Testing:** Currently, no testing framework is installed. If requested to add tests, use **Vitest**. Name files as `*.test.ts` or `*.test.tsx`. To run a single test: `npx vitest run path/to/file.test.ts`.

## Code Style Guidelines

### 1. General Principles
- **Language:** Variables, functions, and comments must be in **English**. UI content and documentation must be in **Spanish**.
- **Modern React:** Use Functional components, Hooks, and React 19 features. Use `'use client'` for interactive components.
- **Idiomatic Next.js:** Use absolute imports `@/*` and follow App Router conventions.

### 2. Imports & Exports
- **Order:**
  1. React/Next.js core (e.g., `useState`, `usePathname`).
  2. External libraries (e.g., `katex`, `react-syntax-highlighter`).
  3. Internal components from `@/components`.
  4. Styles and assets.
- **Example:**
  ```tsx
  import { useEffect, useState } from 'react';
  import Link from 'next/link';
  import { CodeBlock } from '@/components/CodeBlock';
  import './styles.css';
  ```

### 3. TypeScript & Naming
- **Strict Mode:** Enabled. Avoid `any`. Use `unknown` or specific interfaces.
- **Interfaces:** Prefer `interface` for props and data structures.
- **Naming:**
  - **Components:** PascalCase (e.g., `DerivativeGraph.tsx`).
  - **Routes:** kebab-case directories in `src/app/`.
  - **Variables/Functions:** camelCase.
  - **CSS Variables:** kebab-case (e.g., `--highlight-secondary`).

### 4. Styling & Design System
- **Colors:** 
  - Primary: `#0a0a1a` (Dark Blue)
  - Highlight: `#00d4ff` (Cyan)
  - Accent: `#7c3aed` (Purple)
- **CSS Variables:** Use variables from `src/app/globals.css`.
  - `--primary`: Main background color.
  - `--highlight`: Primary action and focus color (Cyan).
  - `--highlight-secondary`: Accent color (Purple).
  - `--text-primary`: White for headings.
  - `--text-secondary`: Gray for body text.
  - `--border`: Dark blue/purple for card borders.
- **Key Classes:**
  - `.card`: Standard container with border and backdrop-blur.
  - `.concept-box`: Highlighted box for definitions (Cyan).
  - `.deep-explanation`: Purple-bordered box for advanced details.
  - `.btn-primary`: Gradient button for main actions.

### 5. Component Patterns
- **Interactive Visualizations:**
  - **Canvas:** For complex, high-frequency updates (e.g., `InteractiveGraph`).
  - **SVG:** For simpler diagrams or static vector graphics.
  - Use `useRef<HTMLCanvasElement>` and `useEffect` for drawing logic.
  - **Canvas Pattern:**
    ```tsx
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // Handle DPI scaling
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Drawing logic...
    }, [dependencies]);
    ```
- **Standard Components API:**
  - `CodeBlock`: Props `{ code: string; language?: string; title?: string }`.
  - `CollapsibleSection`: Props `{ title: string; children: ReactNode; icon?: string }`.
  - `InteractiveGraph`: Props `{ type: 'linear' | 'quadratic' | etc.; title?: string }`.

### 6. Educational Content Structure
Every module page (`page.tsx`) should follow this structure to maintain consistency:
1. **Hero/Intro:** Title and a brief overview of the concept in Spanish.
2. **Interactive Visualization:** A Canvas or SVG component to build intuition.
3. **Formal Definition:** Using KaTeX and `.concept-box`.
4. **Code Implementation:** Using `<CodeBlock language="python" />`.
5. **Deep Dive:** Detailed explanation using `.deep-explanation` for advanced readers.
6. **References:** Links to papers or `llm-ref` sources.

## Content Architecture (Wiki-style)
The project uses a **Content-as-Data** approach with **MDX**. 
- Content files are located in `src/content/[module]/[slug].mdx`.
- Frontmatter is used for `title`, `order`, and `description`.
- Use the `@/components/mdx-components.tsx` to add new React components to the MDX environment.
- Dynamic routing is handled at `src/app/[module]/[slug]/page.tsx`.

### Adding New Content
1. Create a new `.mdx` file in the appropriate module folder within `src/content/`.
2. Define the frontmatter (title, order).
3. Use Markdown for text and JSX for interactive visualizations.

## Development Workflow
1. **Analyze:** Check existing pages for style and tone.
2. **Implementation:**
   - Create route: `src/app/new-module/page.tsx`.
   - Create components: `src/components/NewViz.tsx` if logic > 100 lines.
3. **Verification:**
   - Run `npm run lint`.
   - Run `npx tsc --noEmit`.
   - Ensure mobile responsiveness (Tailwind `md:`, `lg:`).
4. **Git Safety Protocol:**
   - Commit with prefixes: `feat:`, `fix:`, `docs:`, `refactor:`.
   - Never commit `.env` or secrets.
   - Summarize "why" in commit messages, not just "what".

## Error Handling & Accessibility
- **Safety:** Wrap Canvas operations in `try-catch` if they depend on external data.
- **A11y:** Add `aria-label` to interactive elements and ensures keyboard navigation works for buttons/links.
- **Performance:** Memoize expensive calculations with `useMemo` to prevent lag in sliders.

## Common Spanish Technical Terms
- **Gradient Descent:** Descenso del Gradiente.
- **Backpropagation:** Propagación hacia atrás (or keep Backpropagation if common).
- **Neural Network:** Red Neuronal.
- **Layer:** Capa.
- **Weights:** Pesos.
- **Bias:** Sesgo.
- **Learning Rate:** Tasa de Aprendizaje.
- **Loss Function:** Función de Pérdida.
- **Activation Function:** Función de Activación.
- **Optimizer:** Optimizador.
- **Epoch:** Época.
- **Batch Size:** Tamaño del Lote.

## AI Agent Integration (opencode.json)
The project uses `opencode.json` to define agent permissions.
- Agents are allowed to use `bash`, `read`, and `skill` tools.
- `git commit` and `git push` require explicit user confirmation.
- `.env` files are restricted from being read.
