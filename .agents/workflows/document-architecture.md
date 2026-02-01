---
description: Create architecture diagrams using the mermaid-diagrams skill
---

# Workflow: Document Architecture

Este workflow automatiza la creación de diagramas de Mermaid para documentar servicios o componentes, asegurando que la arquitectura sea visual y fácil de entender.

## Pasos

1. **Cargar el skill de mermaid-diagrams**
   // turbo
   ```bash
   cat .agent/skills/mermaid-diagrams/SKILL.md
   ```

2. **Identificar el archivo objetivo** (ej: `src/services/my_service.py`).

3. **Analizar la estructura del código**
   // turbo
   ```bash
   # Revisar métodos, clases y dependencias
   ```

4. **Crear archivo de documentación en `docs/`**
   - **Sequence Diagram**: Para el flujo principal del caso de uso.
   - **Component Diagram**: Para dependencias estáticas.
   - Seguir las guías de estilo del skill.

5. **Verificar renderizado**
   - Abrir en VS Code Markdown Preview (`Ctrl+Shift+V`).
   - O probar en https://mermaid.live

6. **Vincular la documentación** en el archivo de arquitectura principal si corresponde.
