'use client';
import { useEffect, useRef, useState } from 'react';

export default function DerivativeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointX, setPointX] = useState(1);
  const [showSecant, setShowSecant] = useState(false);
  const [h, setH] = useState(1);

  // Function: f(x) = x²
  const f = (x: number) => x * x;
  // Derivative: f'(x) = 2x
  const fPrime = (x: number) => 2 * x;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height * 0.75; // Move origin down
    const scaleX = 50;
    const scaleY = 30;

    // Clear
    ctx.fillStyle = 'rgba(13, 17, 23, 1)';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(42, 42, 74, 0.5)';
    ctx.lineWidth = 1;
    for (let x = centerX % scaleX; x < width; x += scaleX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = centerY % scaleY; y < height; y += scaleY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(160, 160, 176, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw f(x) = x²
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = 0; px < width; px++) {
      const x = (px - centerX) / scaleX;
      const y = f(x);
      const py = centerY - y * scaleY;
      if (py < -50 || py > height + 50) continue;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Calculate point on curve
    const px = centerX + pointX * scaleX;
    const py = centerY - f(pointX) * scaleY;

    // Draw secant line if enabled
    if (showSecant && h > 0.01) {
      const x2 = pointX + h;
      const px2 = centerX + x2 * scaleX;
      const py2 = centerY - f(x2) * scaleY;

      // Secant line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      // Extend line beyond points
      const slope = (f(x2) - f(pointX)) / h;
      const x1_ext = pointX - 2;
      const x2_ext = x2 + 2;
      const y1_ext = f(pointX) + slope * (x1_ext - pointX);
      const y2_ext = f(pointX) + slope * (x2_ext - pointX);
      
      ctx.beginPath();
      ctx.moveTo(centerX + x1_ext * scaleX, centerY - y1_ext * scaleY);
      ctx.lineTo(centerX + x2_ext * scaleX, centerY - y2_ext * scaleY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Second point
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(px2, py2, 6, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px Fira Code, monospace';
      ctx.fillText(`Secante (h = ${h.toFixed(2)})`, 10, 20);
    }

    // Draw tangent line
    const slope = fPrime(pointX);
    const tangentX1 = pointX - 2;
    const tangentX2 = pointX + 2;
    const tangentY1 = f(pointX) + slope * (tangentX1 - pointX);
    const tangentY2 = f(pointX) + slope * (tangentX2 - pointX);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX + tangentX1 * scaleX, centerY - tangentY1 * scaleY);
    ctx.lineTo(centerX + tangentX2 * scaleX, centerY - tangentY2 * scaleY);
    ctx.stroke();

    // Draw point on curve
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();

    // Point label
    ctx.fillStyle = '#f0f0f0';
    ctx.font = '12px Fira Code, monospace';
    ctx.fillText(`(${pointX.toFixed(1)}, ${f(pointX).toFixed(1)})`, px + 12, py - 12);
    
    // Tangent info
    ctx.fillStyle = '#10b981';
    ctx.fillText(`Tangente: pendiente = ${slope.toFixed(2)}`, 10, height - 10);

  }, [pointX, showSecant, h]);

  return (
    <div className="interactive-graph">
      <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--highlight)' }}>
        Visualización de la Derivada
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        La derivada es la <strong style={{ color: '#10b981' }}>pendiente de la recta tangente</strong> en cada punto.
        Mueve el punto para ver cómo cambia.
      </p>
      
      <canvas 
        ref={canvasRef} 
        className="graph-canvas"
        style={{ width: '100%', maxWidth: '600px', height: '300px' }}
      />
      
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'Fira Code, monospace' }}>
        <span style={{ color: '#00d4ff' }}>f(x) = x²</span>
        <span style={{ margin: '0 1rem', color: 'var(--text-secondary)' }}>→</span>
        <span style={{ color: '#10b981' }}>f&apos;(x) = 2x</span>
      </div>

      <div className="graph-controls">
        <div className="slider-group">
          <label className="slider-label">
            <span>Punto x</span>
            <span className="slider-value">{pointX.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={pointX}
            onChange={(e) => setPointX(parseFloat(e.target.value))}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label" style={{ marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showSecant}
              onChange={(e) => setShowSecant(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            <span>Mostrar secante</span>
          </label>
          {showSecant && (
            <>
              <label className="slider-label">
                <span>h (incremento)</span>
                <span className="slider-value">{h.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.05"
                max="2"
                step="0.05"
                value={h}
                onChange={(e) => setH(parseFloat(e.target.value))}
              />
            </>
          )}
        </div>
      </div>

      {showSecant && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'rgba(245, 158, 11, 0.1)', 
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <strong style={{ color: '#f59e0b' }}>👀 Observa:</strong> Cuando h → 0, la secante 
          (naranja) se acerca cada vez más a la tangente (verde). ¡Esa es la definición de derivada!
        </div>
      )}
    </div>
  );
}
