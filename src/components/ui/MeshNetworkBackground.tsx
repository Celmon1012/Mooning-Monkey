import { useEffect, useRef } from 'react';

interface MeshNetworkBackgroundProps {
  className?: string;
  /** 0–1 overall visibility */
  intensity?: number;
  variant?: 'cyan' | 'purple' | 'mixed';
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
}

const COLORS = {
  cyan: { node: '93, 199, 254', line: '93, 199, 254' },
  purple: { node: '168, 85, 247', line: '168, 85, 247' },
  mixed: { node: '255, 255, 255', line: '93, 199, 254' },
};

export function MeshNetworkBackground({
  className = '',
  intensity = 0.85,
  variant = 'mixed',
}: MeshNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = COLORS[variant];
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const nodeCount = isMobile ? 55 : 95;
    const connectDist = isMobile ? 110 : 140;

    const nodes: Node3D[] = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 1.8,
      ox: (Math.random() - 0.5) * 0.003,
      oy: (Math.random() - 0.5) * 0.003,
      oz: (Math.random() - 0.5) * 0.002,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.35,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.35,
      };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    resize();

    let t = 0;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      t += 0.004;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const rotY = t * 0.35 + mx;
      const rotX = t * 0.12 + my * 0.5;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: { sx: number; sy: number; scale: number; z: number }[] = [];

      for (const n of nodes) {
        n.x += n.ox;
        n.y += n.oy;
        n.z += n.oz;
        if (Math.abs(n.x) > 1.4) n.ox *= -1;
        if (Math.abs(n.y) > 1.2) n.oy *= -1;
        if (Math.abs(n.z) > 1.2) n.oz *= -1;

        let x1 = n.x * cosY - n.z * sinY;
        let z1 = n.x * sinY + n.z * cosY;
        let y1 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        const perspective = 2.8 / (2.8 + z2);
        projected.push({
          sx: w / 2 + x1 * w * 0.42 * perspective,
          sy: h / 2 + y1 * h * 0.38 * perspective,
          scale: perspective,
          z: z2,
        });
      }

      // Lines — back to front feel via z sort on connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist > connectDist) continue;

          const depth = (a.scale + b.scale) / 2;
          const alpha = (1 - dist / connectDist) * depth * 0.35 * intensity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
          ctx.lineWidth = 0.6 + depth * 0.5;
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      for (const p of projected) {
        const alpha = p.scale * 0.55 * intensity;
        const radius = (1.2 + p.scale * 2) * intensity;
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, radius * 3);
        grad.addColorStop(0, `rgba(${colors.node}, ${alpha})`);
        grad.addColorStop(1, `rgba(${colors.node}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, variant]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/55 via-void/35 to-void/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,transparent_0%,rgba(3,0,20,0.45)_100%)]" />
    </div>
  );
}
