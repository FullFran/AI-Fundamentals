'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type SurfaceType = 'bowl' | 'rosenbrock' | 'beale' | 'himmelblau';

// Classic optimization benchmark functions used in education
const SURFACES: Record<SurfaceType, { 
  name: string; 
  description: string; 
  startX: number; 
  startY: number;
  minLabel: string;
}> = {
  bowl: { 
    name: '🥣 Cuenco Simple', 
    description: 'Superficie convexa ideal. Mínimo global en (0, 0).',
    startX: 3, startY: 3,
    minLabel: '(0, 0)'
  },
  rosenbrock: { 
    name: '🍌 Rosenbrock (Banana)', 
    description: 'Valle largo y estrecho. SGD zigzaguea, momentum fluye. Mínimo en (1, 1).',
    startX: -1.5, startY: 2,
    minLabel: '(1, 1)'
  },
  beale: { 
    name: '🌊 Beale', 
    description: 'Función multimodal con picos. Mínimo en (3, 0.5).',
    startX: -2, startY: 2,
    minLabel: '(3, 0.5)'
  },
  himmelblau: { 
    name: '🔷 Himmelblau', 
    description: '4 mínimos globales simétricos. Diferentes inicios → diferentes mínimos.',
    startX: -4, startY: -4,
    minLabel: '±(3, 2)'
  }
};

export default function GradientDescentSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const [isRunning, setIsRunning] = useState(false);
  const [useMomentum, setUseMomentum] = useState(false);
  const [learningRate, setLearningRate] = useState(0.05);
  const [surfaceType, setSurfaceType] = useState<SurfaceType>('bowl');
  
  // Position state
  const posRef = useRef({ x: 3.5, y: 3.5 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const pathRef = useRef<Array<{x: number, y: number}>>([]);
  
  // Classic optimization benchmark functions
  // These are used in education and research to test optimization algorithms
  const lossFunction = useCallback((x: number, y: number) => {
    switch (surfaceType) {
      case 'bowl':
        // Simple convex quadratic - baseline
        // f(x,y) = x² + y², minimum at (0, 0)
        return 0.1 * (x * x + y * y);
        
      case 'rosenbrock':
        // Rosenbrock "Banana" function - famous test function
        // f(x,y) = (a-x)² + b(y-x²)², with a=1, b=100
        // Global minimum at (1, 1) with f(1,1) = 0
        // Has a long, narrow parabolic valley - hard for SGD
        const a = 1, b = 100;
        return Math.pow(a - x, 2) + b * Math.pow(y - x * x, 2);
        
      case 'beale':
        // Beale function - multimodal with flat regions
        // f(x,y) = (1.5-x+xy)² + (2.25-x+xy²)² + (2.625-x+xy³)²
        // Global minimum at (3, 0.5) with f = 0
        return Math.pow(1.5 - x + x * y, 2) + 
               Math.pow(2.25 - x + x * y * y, 2) + 
               Math.pow(2.625 - x + x * y * y * y, 2);
        
      case 'himmelblau':
        // Himmelblau function - 4 identical local minima
        // f(x,y) = (x²+y-11)² + (x+y²-7)²
        // 4 global minima at approximately:
        // (3, 2), (-2.805, 3.131), (-3.779, -3.283), (3.584, -1.848)
        return Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2);
        
      default:
        return 0.1 * (x * x + y * y);
    }
  }, [surfaceType]);

  // Gradient (partial derivatives via numerical differentiation)
  const gradient = useCallback((x: number, y: number) => {
    const h = 0.001;
    const dfdx = (lossFunction(x + h, y) - lossFunction(x - h, y)) / (2 * h);
    const dfdy = (lossFunction(x, y + h) - lossFunction(x, y - h)) / (2 * h);
    return { dx: dfdx, dy: dfdy };
  }, [lossFunction]);

  const reset = useCallback(() => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const surface = SURFACES[surfaceType];
    posRef.current = { x: surface.startX, y: surface.startY };
    velocityRef.current = { x: 0, y: 0 };
    pathRef.current = [];
  }, [surfaceType]);

  // Draw function
  const draw = useCallback(() => {
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
    
    // Adjust scale and view based on surface type
    let scale: number, viewRange: number, colorScale: number;
    switch (surfaceType) {
      case 'rosenbrock':
        scale = Math.min(width, height) / 8;
        viewRange = 4;
        colorScale = 0.02; // Rosenbrock has large values
        break;
      case 'beale':
        scale = Math.min(width, height) / 12;
        viewRange = 6;
        colorScale = 0.1;
        break;
      case 'himmelblau':
        scale = Math.min(width, height) / 12;
        viewRange = 6;
        colorScale = 0.3;
        break;
      default: // bowl
        scale = Math.min(width, height) / 10;
        viewRange = 5;
        colorScale = 30;
    }
    
    const offsetX = width / 2;
    const offsetY = height / 2;

    // Transform coordinates
    const toCanvas = (x: number, y: number) => ({
      cx: offsetX + x * scale,
      cy: offsetY - y * scale
    });

    // Clear
    ctx.fillStyle = 'rgba(13, 17, 23, 1)';
    ctx.fillRect(0, 0, width, height);

    // Draw heatmap of loss function
    for (let py = 0; py < height; py += 3) {
      for (let px = 0; px < width; px += 3) {
        const x = (px - offsetX) / scale;
        const y = (offsetY - py) / scale;
        const z = lossFunction(x, y);
        
        // Color based on height (log scale for better visualization)
        const logZ = Math.log(z + 1);
        const intensity = Math.min(255, logZ * colorScale * 50);
        const r = Math.floor(10 + intensity * 0.4);
        const g = Math.floor(15 + intensity * 0.15);
        const b = Math.floor(40 + Math.min(200, intensity * 0.9));
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(px, py, 3, 3);
      }
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(100, 100, 150, 0.2)';
    ctx.lineWidth = 1;
    for (let i = -viewRange; i <= viewRange; i++) {
      const { cx } = toCanvas(i, 0);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      
      const { cy } = toCanvas(0, i);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
    }

    // Draw path
    if (pathRef.current.length > 1) {
      ctx.strokeStyle = useMomentum ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const start = toCanvas(pathRef.current[0].x, pathRef.current[0].y);
      ctx.moveTo(start.cx, start.cy);
      for (let i = 1; i < pathRef.current.length; i++) {
        const pt = toCanvas(pathRef.current[i].x, pathRef.current[i].y);
        ctx.lineTo(pt.cx, pt.cy);
      }
      ctx.stroke();
    }

    // Draw current position
    const { cx, cy } = toCanvas(posRef.current.x, posRef.current.y);
    
    // Glow effect
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw minimum point marker
    const { cx: minCx, cy: minCy } = toCanvas(0, 0);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(minCx, minCy, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.font = '10px Fira Code';
    ctx.fillText('min', minCx - 10, minCy + 25);

    // Info
    ctx.fillStyle = '#f0f0f0';
    ctx.font = '12px Fira Code, monospace';
    ctx.fillText(`Posición: (${posRef.current.x.toFixed(2)}, ${posRef.current.y.toFixed(2)})`, 10, 20);
    ctx.fillText(`Loss: ${lossFunction(posRef.current.x, posRef.current.y).toFixed(4)}`, 10, 38);
    ctx.fillText(`Pasos: ${pathRef.current.length}`, 10, 56);

  }, [lossFunction, useMomentum, surfaceType]);

  // Animation step - use ref to avoid declaration order issue
  const stepRef = useRef<() => void>(() => {});
  
  useEffect(() => {
    stepRef.current = () => {
      const { dx, dy } = gradient(posRef.current.x, posRef.current.y);
      const momentumFactor = 0.9;

      if (useMomentum) {
        velocityRef.current.x = momentumFactor * velocityRef.current.x - learningRate * dx;
        velocityRef.current.y = momentumFactor * velocityRef.current.y - learningRate * dy;
        posRef.current.x += velocityRef.current.x;
        posRef.current.y += velocityRef.current.y;
      } else {
        posRef.current.x -= learningRate * dx;
        posRef.current.y -= learningRate * dy;
      }

      pathRef.current.push({ ...posRef.current });

      // Check convergence
      const loss = lossFunction(posRef.current.x, posRef.current.y);
      if (loss < 0.001 || pathRef.current.length > 500) {
        setIsRunning(false);
        return;
      }

      draw();

      if (isRunning) {
        animationRef.current = requestAnimationFrame(() => stepRef.current());
      }
    };
  }, [gradient, lossFunction, learningRate, useMomentum, isRunning, draw]);

  // Run animation
  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(() => stepRef.current());
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  const toggleRun = () => {
    if (!isRunning) {
      if (pathRef.current.length === 0) {
        pathRef.current.push({ ...posRef.current });
      }
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="simulation-container">
      <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--highlight)' }}>
        Simulación: Descenso del Gradiente
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Observa cómo el algoritmo &quot;baja la colina&quot; siguiendo la dirección de máxima pendiente 
        para encontrar el mínimo de la función de pérdida.
      </p>

      <canvas 
        ref={canvasRef} 
        className="simulation-canvas"
        style={{ width: '100%', maxWidth: '450px', height: '380px' }}
      />

      <div className="simulation-controls">
        <button 
          className={`simulation-btn ${isRunning ? 'simulation-btn-reset' : 'simulation-btn-start'}`}
          onClick={toggleRun}
        >
          {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        <button className="simulation-btn simulation-btn-reset" onClick={reset}>
          🔄 Reiniciar
        </button>

        <div className="slider-group" style={{ marginTop: '0.5rem' }}>
          <label className="slider-label">
            <span>Superficie</span>
          </label>
          <select
            value={surfaceType}
            onChange={(e) => {
              setSurfaceType(e.target.value as SurfaceType);
              setTimeout(() => reset(), 0);
            }}
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: 'var(--bg-secondary)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {(Object.keys(SURFACES) as SurfaceType[]).map((key) => (
              <option key={key} value={key}>
                {SURFACES[key].name}
              </option>
            ))}
          </select>
          <p style={{ 
            margin: '0.5rem 0 0', 
            fontSize: '0.8rem', 
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}>
            {SURFACES[surfaceType].description}
          </p>
        </div>

        <div className="slider-group">
          <label className="slider-label">
            <span>Learning Rate</span>
            <span className="slider-value">{learningRate.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.01"
            max="0.2"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label">
            <input
              type="checkbox"
              checked={useMomentum}
              onChange={(e) => {
                setUseMomentum(e.target.checked);
                reset();
              }}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ color: useMomentum ? '#10b981' : 'inherit' }}>
              Usar Momentum
            </span>
          </label>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: useMomentum ? 'rgba(16, 185, 129, 0.1)' : 'rgba(124, 58, 237, 0.1)', 
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        {useMomentum ? (
          <>
            <strong style={{ color: '#10b981' }}>🚀 Momentum activado:</strong> La &quot;bolita&quot; acumula 
            velocidad como una bola rodando, lo que le permite escapar de mínimos locales y converger 
            más rápido. <strong>Adam</strong> combina momentum con learning rate adaptativo.
          </>
        ) : (
          <>
            <strong style={{ color: '#7c3aed' }}>📉 SGD básico:</strong> El descenso simple sigue 
            directamente el gradiente en cada paso. Puede quedarse atrapado en mínimos locales 
            o zigzaguear en valles estrechos.
          </>
        )}
      </div>
    </div>
  );
}
