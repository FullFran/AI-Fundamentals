---
name: mdx-guru
description: Expert guidance for writing robust MDX content in the AI-Fundamentals project. Prevents build-breaking syntax errors.
license: MIT
metadata:
  author: Antigravity
  version: "1.0"
---

# MDX Guru Skill

This skill ensures that all MDX content in the project is syntactically correct, follows the "Bottom-Up" educational style, and does not break the Next.js build.

## Critical Syntax Rules (Prevention of Build Errors)

### 1. LaTeX & Special Characters
- **NO `$`: $** MDX interprets dollar signs as potential variables/code.
- **NO `\`: ** Backslashes in Markdown text can be interpreted as escape characters.
- **Use `<math-block>`**: For any mathematical formula, wrap it in our custom component.
- **PlainText Math**: Inside tags, use plain text characters (`*`, `^`, `/`, `|v|`) or HTML entities.

### 2. Mermaid Integration
- **Double Quotes Only**: Always use `chart=" ... "` for the prop.
- **NO Template Literals**: Never use `{` `}` or backticks inside MDX component props.
- **Simple IDs**: Use single letters or words without spaces for node IDs.
- **No Non-ASCII**: Avoid accents (á, é, ñ) inside the `chart` string.

### 3. Component Nesting
- **No `<p>` inside `<p>`**: MDX wraps text in paragraphs. 
- **Use `<div>` or `<span>`**: For manual markup inside cards or concept boxes.

## Component Cheat Sheet

| Component | Usage |
| :--- | :--- |
| `<math-block>` | Centered math formulas. |
| `<concept-box>` | Highlights key definitions (Cyan border). |
| `<CollapsibleSection>` | Deep dives and extra info. Props: `title`, `icon`. |
| `<CodeBlock>` | Python/TS snippets. Props: `title`, `language`, `code`. |
| `<Mermaid>` | Flowcharts and diagrams. Prop: `chart`. |

## Validation Checklist before Saving
1. Are there any naked `$` signs? (Should be 0).
2. Are all Mermaid node IDs alphanumeric only?
3. Is there any template literal (backticks) inside a prop?
4. Are all manual text blocks inside components wrapped in `<div>` instead of `<p>`?
