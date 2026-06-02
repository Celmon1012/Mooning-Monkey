import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { assets } from '../../data/assets';
import { Particles } from './Particles';
import { VideoBackground } from './VideoBackground';

/** Full-bleed Lumia-style cinematic 3D layer for the hero */
export function HeroCinematicScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  const orbX = useTransform(springX, (v) => v * 2.2);
  const orbY = useTransform(springY, (v) => v * 2.2);
  const bgX = useTransform(springX, (v) => v * 0.5);
  const bgY = useTransform(springY, (v) => v * 0.5);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 55);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 55);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Cinematic video — large scale, visible motion */}
      <VideoBackground
        src={assets.video}
        poster={assets.heroBg}
        opacity={0.58}
        parallax={false}
        videoScale={1.35}
        overlayClassName="bg-transparent"
        className="!absolute inset-0"
      />

      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050818] via-void/40 to-void" />

      {/* Massive parallax nebula — fills viewport like Lumia */}
      <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
        <div className="absolute -left-[30%] top-[-25%] h-[140vmin] w-[140vmin] rounded-full bg-purple-glow/35 blur-[140px]" />
        <div className="absolute -right-[25%] top-[5%] h-[120vmin] w-[120vmin] rounded-full bg-cyan-glow/28 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[15%] h-[100vmin] w-[100vmin] rounded-full bg-magenta-glow/22 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5dc7fe]/10 blur-[100px]" />
      </motion.div>

      {/* Animated light beams */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[min(140vw,1600px)] -translate-x-1/2 opacity-30"
        style={{
          background:
            'conic-gradient(from 200deg at 50% 30%, transparent 0deg, rgba(93,199,254,0.15) 40deg, transparent 80deg, rgba(248,49,236,0.12) 140deg, transparent 200deg)',
        }}
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Star field — larger spread */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 10% 20%, white, transparent),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 70% 30%, white, transparent),
            radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 50% 90%, white, transparent)`,
          backgroundSize: '100% 100%',
        }}
      />

      <Particles count={36} />

      {/* Side depth image — crash game atmosphere */}
      <motion.div
        className="absolute inset-0 opacity-[0.18] mix-blend-screen"
        style={{
          x: bgX,
          y: bgY,
          backgroundImage: `url(${assets.heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette — lighter center so 3D reads; darker edges only */}
      <div className="hero-vignette-cinematic absolute inset-0" />

      {/* Readability scrim for text column */}
      <div className="absolute inset-y-0 left-0 w-full max-w-[65%] bg-gradient-to-r from-void/85 via-void/40 to-transparent lg:max-w-[55%]" />
    </div>
  );
}
