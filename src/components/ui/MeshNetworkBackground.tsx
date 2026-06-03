import { useEffect, useRef } from 'react';

interface MeshNetworkBackgroundProps {
  className?: string;
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

/** Shared mouse position — one listener for all mesh instances */
const sharedMouse = { x: 0, y: 0 };
let mouseListenerCount = 0;

function attachSharedMouse() {
  if (mouseListenerCount++ > 0) return;
  const onMove = (e: MouseEvent) => {
    sharedMouse.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
    sharedMouse.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
  };
  window.addEventListener('mousemove', onMove, { passive: true });
  (attachSharedMouse as { off?: () => void }).off = () => {
    window.removeEventListener('mousemove', onMove);
  };
}

function detachSharedMouse() {
  if (--mouseListenerCount === 0) {
    (attachSharedMouse as { off?: () => void }).off?.();
  }
}

export function MeshNetworkBackground({
  className = '',
  intensity = 0.85,
  variant = 'mixed',
}: MeshNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const colors = COLORS[variant];
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const nodeCount = isMobile ? 28 : 42;
    const connectDist = isMobile ? 95 : 115;
    const connectDistSq = connectDist * connectDist;
    const fpsCap = isMobile ? 30 : 45;
    const frameInterval = 1000 / fpsCap;
    let lastFrame = 0;

    const nodes: Node3D[] = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 1.8,
      ox: (Math.random() - 0.5) * 0.003,
      oy: (Math.random() - 0.5) * 0.003,
      oz: (Math.random() - 0.5) * 0.002,
    }));

    let inView = false;
    let tabVisible = !document.hidden;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && tabVisible && !runningRef.current) {
          runningRef.current = true;
          rafRef.current = requestAnimationFrame(draw);
        }
      },
      { rootMargin: '80px 0px', threshold: 0.01 },
    );
    observer.observe(container);
    inView = container.getBoundingClientRect().top < window.innerHeight + 120;

    const onVisibility = () => {
      tabVisible = !document.hidden;
      if (!tabVisible) {
        cancelAnimationFrame(rafRef.current);
        runningRef.current = false;
      } else if (inView && !runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    attachSharedMouse();
    window.addEventListener('resize', resize, { passive: true });
    resize();

    let t = 0;

    const draw = (now: number) => {
      if (!inView || !tabVisible) {
        runningRef.current = false;
        return;
      }

      if (now - lastFrame < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      t += 0.004;
      const mx = sharedMouse.x;
      const my = sharedMouse.y;

      ctx.clearRect(0, 0, w, h);

      const rotY = t * 0.35 + mx;
      const rotX = t * 0.12 + my * 0.5;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: { sx: number; sy: number; scale: number }[] = [];

      for (const n of nodes) {
        n.x += n.ox;
        n.y += n.oy;
        n.z += n.oz;
        if (Math.abs(n.x) > 1.4) n.ox *= -1;
        if (Math.abs(n.y) > 1.2) n.oy *= -1;
        if (Math.abs(n.z) > 1.2) n.oz *= -1;

        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        const perspective = 2.8 / (2.8 + z2);
        projected.push({
          sx: w / 2 + x1 * w * 0.42 * perspective,
          sy: h / 2 + y1 * h * 0.38 * perspective,
          scale: perspective,
        });
      }

      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const distSq = dx * dx + dy * dy;
          if (distSq > connectDistSq) continue;

          const dist = Math.sqrt(distSq);
          const depth = (a.scale + b.scale) / 2;
          const alpha = (1 - dist / connectDist) * depth * 0.32 * intensity;
          ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      for (const p of projected) {
        const alpha = p.scale * 0.5 * intensity;
        const radius = (1 + p.scale * 1.8) * intensity;
        ctx.fillStyle = `rgba(${colors.node}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!runningRef.current && inView && tabVisible) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    startLoop();
    const startTimer = window.setTimeout(startLoop, 0);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      detachSharedMouse();
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
