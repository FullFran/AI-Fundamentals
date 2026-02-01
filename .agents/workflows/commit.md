---
description: Create a new git commit for uncommitted changes
---

# Workflow: Commit

Este workflow automatiza y guía el proceso de creación de commits atómicos y de alta calidad, siguiendo las mejores prácticas de arquitectura.

## Pasos

1. **Analizar cambios pendientes**
   // turbo
   ```bash
   git status --porcelain
   ```

2. **Agrupar cambios en unidades lógicas**
   - Separar bug fixes, features y refactors.
   - NO incluir cambios no relacionados en el mismo commit.

3. **Para cada cambio atómico:**
   - Staging de archivos relevantes: `git add <archivo1> <archivo2>...`
   - Redactar un mensaje de commit de alta calidad:
     - **Subject**: Resumen de una línea (máx 50 caracteres), en modo imperativo (ej: "Add feature X").
     - **Body**: Explicación detallada de **por qué** se hizo el cambio, con wrap a 72 caracteres. Explica el problema y el razonamiento detrás de la solución.

   **Formato Sugerido:**
   ```text
   Subject: [feat|fix|docs|refactor|test]: Brief summary

   Detailed description of the motivation for this change.
   What problem does it solve?
   Are there any side effects?
   ```

4. **Verificar el historial de commits**
   // turbo
   ```bash
   git log -n 5 --oneline --graph
   ```
