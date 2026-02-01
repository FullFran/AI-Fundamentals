'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type FunctionType = 'linear' | 'quadratic' | 'exponential' | 'sigmoid' | 'relu';

interface InteractiveGraphProps {
  type: FunctionType;
  title?: string;
}

export default function InteractiveGraph({ type, title }: InteractiveGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for parameters
  const [k, setK] = useState(2);           // Linear: y = kx
  const [n, setN] = useState(2);           // Quadratic: y = x^n
  const [a, setA] = useState(1);           // Exponential amplitude
  const [slope, setSlope] = useState(1);   // Sigmoid steepness
  
  // Calculate function value
  const calcFunction = useCallback((x: number): number => {
    switch (type) {
      case 'linear':
        return k * x;
      case 'quadratic':
        return Math.pow(x, n);
      case 'exponential':
        return a * Math.exp(x);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-slope * x));
      case 'relu':
        return Math.max(0, x);
      default:
        return x;
    }
  }, [type, k, n, a, slope]);

  // Draw graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get actual dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = 'rgba(13, 17, 23, 1)';
    ctx.fillRect(0, 0, width, height);

    // Scale factors
    let scaleX = 40; // pixels per unit
    let scaleY = 40;
    
    // Adjust scale for different function types
    if (type === 'exponential') {
      scaleY = 15;
    } else if (type === 'sigmoid') {
      scaleY = 100;
    }

    // Draw grid
    ctx.strokeStyle = 'rgba(42, 42, 74, 0.5)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = centerX % scaleX; x < width; x += scaleX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = centerY % scaleY; y < height; y += scaleY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(160, 160, 176, 0.8)';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw function
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let isFirst = true;
    for (let px = 0; px < width; px++) {
      const x = (px - centerX) / scaleX;
      const y = calcFunction(x);
      const py = centerY - y * scaleY;

      // Skip if out of bounds
      if (py < -100 || py > height + 100) {
        isFirst = true;
        continue;
      }

      if (isFirst) {
        ctx.moveTo(px, py);
        isFirst = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#a0a0b0';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('x', width - 15, centerY - 8);
    ctx.fillText('y', centerX + 8, 15);

    // Draw scale markers
    ctx.fillStyle = '#a0a0b0';
    ctx.font = '10px Fira Code, monospace';
    
    // X-axis markers
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const px = centerX + i * scaleX;
      ctx.fillText(String(i), px - 4, centerY + 15);
    }

  }, [calcFunction, type]);

  // Render controls based on function type
  const renderControls = () => {
    switch (type) {
      case 'linear':
        return (
          <div className="slider-group">
            <label className="slider-label">
              <span>k (pendiente)</span>
              <span className="slider-value">{k.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={k}
              onChange={(e) => setK(parseFloat(e.target.value))}
            />
          </div>
        );
      case 'quadratic':
        return null; // Cuadrática es siempre y = x², sin controles
      case 'exponential':
        return (
          <div className="slider-group">
            <label className="slider-label">
              <span>a (amplitud)</span>
              <span className="slider-value">{a.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
            />
          </div>
        );
      case 'sigmoid':
        return (
          <div className="slider-group">
            <label className="slider-label">
              <span>pendiente</span>
              <span className="slider-value">{slope.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getFunctionLabel = () => {
    switch (type) {
      case 'linear': return `y = ${k.toFixed(1)}x`;
      case 'quadratic': return 'y = x²';
      case 'exponential': return `y = ${a.toFixed(1)} · eˣ`;
      case 'sigmoid': return `σ(x) = 1 / (1 + e^(-${slope.toFixed(1)}x))`;
      case 'relu': return 'ReLU(x) = max(0, x)';
      default: return '';
    }
  };

  return (
    <div className="interactive-graph">
      {title && <h4 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--highlight)' }}>{title}</h4>}
      <canvas 
        ref={canvasRef} 
        className="graph-canvas"
        style={{ width: '100%', maxWidth: '600px', height: '300px' }}
      />
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'Fira Code, monospace', color: 'var(--highlight)' }}>
        {getFunctionLabel()}
      </div>
      <div className="graph-controls">
        {renderControls()}
      </div>
    </div>
  );
}
