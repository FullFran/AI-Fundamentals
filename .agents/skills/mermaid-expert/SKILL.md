---
name: mermaid-expert
description: Expert guidance for creating, debugging, and styling Mermaid.js diagrams in MDX environments.
license: MIT
metadata:
  author: Antigravity
  version: "1.0"
---

# Mermaid Expert Skill

This skill provides comprehensive rules and patterns for integrating Mermaid.js diagrams into educational content, ensuring they are robust, accessible, and visually aligned with the project's design system.

## Core Principles
1. **Robustness First**: Mermaid is sensitive to syntax. Always use simple node IDs and avoid special characters in labels unless properly quoted.
2. **MDX Compatibility**: In MDX, use double quotes for the `chart` prop and avoid template literals inside the prop to prevent escaping issues.
3. **Visual Consistency**: Use the project's CSS variables for node styling.

## Syntax Guidelines

### 1. Node Naming
- Use alphanumeric IDs: `Node1`, `InputA`, `Layer1`.
- Avoid spaces in IDs. Use labels for display text: `ID[Display Text]`.
- **Bad**: `graph LR; My Node --> Other Node`
- **Good**: `graph LR; A[My Node] --> B[Other Node]`

### 2. Labels & Special Characters
- Wrap labels containing math or special chars in double quotes: `Sum["Σ wᵢxᵢ + b"]`.
- Use HTML entities if needed: `&sigma;` for σ, `&beta;` for β.

### 3. Styling Patterns
- Always define styles at the bottom of the chart.
- Use the `style` command for individual nodes and `classDef` for groups.
- Colors should follow the theme:
  - Cyan: `#00d4ff`
  - Purple: `#7c3aed`
  - Slate: `#1e293b`

## Troubleshooting common errors
- **ReferenceError**: Usually caused by unquoted special characters like `$` or `\`.
- **Syntax Error**: Check for triple dashes `---` (use `-->` or `-- text -->` instead) and ensuring subgraphs are closed with `end`.
- **Hydration Mismatch**: Ensure the Mermaid component is marked with `"use client"`.

## Integration Example
```markdown
<Mermaid chart="
graph LR
    A[Input] --> B{Process}
    B -->|Success| C[Output]
    style A fill:#1e293b,stroke:#00d4ff
" />
```
