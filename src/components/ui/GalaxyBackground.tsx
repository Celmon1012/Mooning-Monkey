import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function GalaxyBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nebula via-void to-void" />

      {/* Nebula orbs with parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-purple-glow/20 blur-[120px]"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-glow/15 blur-[100px]"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-magenta-glow/10 blur-[80px]"
      />

      {/* Star field */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 160px 120px, white, transparent)`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent" />
    </div>
  );
}
