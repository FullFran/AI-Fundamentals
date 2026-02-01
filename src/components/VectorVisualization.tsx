'use client';
import { useEffect, useRef, useState } from 'react';

export default function VectorVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(45); // Angle between vectors in degrees
  const [showProjection, setShowProjection] = useState(true);

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
    const centerX = width * 0.2;
    const centerY = height * 0.7;
    const scale = 2;

    // Clear
    ctx.fillStyle = 'rgba(13, 17, 23, 1)';
    ctx.fillRect(0, 0, width, height);

    // Vector A (fixed, horizontal)
    const aLen = 100;
    const ax = aLen;
    const ay = 0;

    // Vector B (rotates based on angle)
    const bLen = 80;
    const angleRad = (angle * Math.PI) / 180;
    const bx = bLen * Math.cos(angleRad);
    const by = -bLen * Math.sin(angleRad); // Negative because canvas Y is inverted

    // Calculate dot product
    const dotProduct = ax * bx + ay * (-by); // Correct for canvas coords
    const aMag = aLen;
    const bMag = bLen;
    const cosTheta = Math.cos(angleRad);
    
    // Projection of B onto A
    const projScalar = (dotProduct / (aMag * aMag)) * scale;
    const projX = projScalar * ax;

    // Draw helper lines
    ctx.strokeStyle = 'rgba(160, 160, 176, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    // Draw projection line (vertical from B to A)
    if (showProjection) {
      ctx.beginPath();
      ctx.moveTo(centerX + bx * scale, centerY + by * scale);
      ctx.lineTo(centerX + projX, centerY);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = 'rgba(160, 160, 176, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 20, centerY);
    ctx.lineTo(centerX + aLen * scale + 40, centerY);
    ctx.stroke();

    // Draw arrow function
    const drawArrow = (
      fromX: number, fromY: number, 
      toX: number, toY: number, 
      color: string, 
      label: string
    ) => {
      const headLen = 10;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      // Line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - headLen * Math.cos(angle - Math.PI / 6),
        toY - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toX - headLen * Math.cos(angle + Math.PI / 6),
        toY - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.fillText(label, toX + 8, toY - 8);
    };

    // Draw vector A (cyan)
    drawArrow(centerX, centerY, centerX + ax * scale, centerY + ay * scale, '#00d4ff', 'A');

    // Draw vector B (purple)
    drawArrow(centerX, centerY, centerX + bx * scale, centerY + by * scale, '#7c3aed', 'B');

    // Draw projection (green)
    if (showProjection && angle !== 90) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + projX, centerY);
      ctx.stroke();

      // Projection label
      ctx.fillStyle = '#10b981';
      ctx.font = '12px Fira Code, monospace';
      ctx.fillText('proyección', centerX + projX / 2 - 30, centerY + 20);
    }

    // Draw angle arc
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, -angleRad, true);
    ctx.stroke();

    // Angle label
    ctx.fillStyle = '#f59e0b';
    ctx.font = '12px Fira Code, monospace';
    ctx.fillText(`θ = ${angle}°`, centerX + 35, centerY - 10);

    // Info box
    ctx.fillStyle = 'rgba(30, 30, 60, 0.8)';
    ctx.fillRect(width - 180, 10, 170, 80);
    ctx.strokeStyle = 'var(--border)';
    ctx.strokeRect(width - 180, 10, 170, 80);

    ctx.font = '11px Fira Code, monospace';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(`A · B = ${dotProduct.toFixed(0)}`, width - 170, 30);
    ctx.fillStyle = '#a0a0b0';
    ctx.fillText(`|A| = ${aMag}`, width - 170, 48);
    ctx.fillText(`|B| = ${bMag}`, width - 170, 64);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`cos(θ) = ${cosTheta.toFixed(3)}`, width - 170, 80);

  }, [angle, showProjection]);

  return (
    <div className="vector-viz">
      <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--highlight)' }}>
        Producto Escalar como Proyección
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'left' }}>
        El producto escalar <code>A · B = |A| |B| cos(θ)</code> mide cuánto un vector 
        &quot;apunta en la dirección&quot; del otro. La <strong style={{ color: '#10b981' }}>proyección</strong> es 
        la &quot;sombra&quot; de B sobre A.
      </p>

      <canvas 
        ref={canvasRef} 
        className="vector-canvas"
        style={{ width: '100%', maxWidth: '450px', height: '280px' }}
      />

      <div className="graph-controls" style={{ marginTop: '1rem' }}>
        <div className="slider-group">
          <label className="slider-label">
            <span>Ángulo θ</span>
            <span className="slider-value">{angle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label">
            <input
              type="checkbox"
              checked={showProjection}
              onChange={(e) => setShowProjection(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            <span>Mostrar proyección</span>
          </label>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'rgba(0, 212, 255, 0.1)', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        textAlign: 'left'
      }}>
        <strong style={{ color: '#00d4ff' }}>💡 Observa:</strong>
        <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
          <li>Cuando θ = 0°, los vectores apuntan igual → producto máximo</li>
          <li>Cuando θ = 90°, son perpendiculares → producto = 0</li>
          <li>Cuando θ = 180°, son opuestos → producto negativo</li>
        </ul>
        <p style={{ marginTop: '0.75rem', marginBottom: 0, fontStyle: 'italic' }}>
          Esto es la base de <strong>Cosine Similarity</strong>, usado en RAG y embeddings.
        </p>
      </div>
    </div>
  );
}
