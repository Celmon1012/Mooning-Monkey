import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { assets, links } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Reveal3D } from '../ui/Reveal3D';
import { SectionHeading } from '../ui/SectionHeading';
import { PosterBackground } from '../ui/PosterBackground';

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <AnimatedSection id="video" mesh="mixed" className="section-padding overflow-hidden">
      <PosterBackground
        src={assets.heroBg}
        opacity={0.2}
        overlayClassName="bg-gradient-to-b from-void/92 via-void/85 to-void"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          label="Experience"
          title="Witness The Space Odyssey"
          subtitle="Watch the Mooning Monkeys embark on their epic journey through the cosmos."
        />

        <Reveal3D className="relative">
          <div className="panel overflow-hidden p-0">
            <div className="relative aspect-video bg-void">
              <video
                ref={videoRef}
                src={assets.video}
                className="h-full w-full object-cover"
                loop
                playsInline
                preload="none"
                poster={assets.heroBg}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />

              {/* Play overlay */}
              {!playing && (
                <motion.button
                  type="button"
                  onClick={handlePlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-void/40 backdrop-blur-sm transition-colors hover:bg-void/30"
                  aria-label="Play video"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lift"
                  >
                    <Play size={32} className="ml-1 text-void" fill="currentColor" />
                  </motion.div>
                </motion.button>
              )}
            </div>

            {/* Video info bar */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
              <div>
                <h4 className="font-display font-semibold">Mooning Monkey Official Trailer</h4>
                <p className="text-sm text-white/50">The greatest space mission of all time</p>
              </div>
              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent transition-colors hover:text-white"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </Reveal3D>
      </div>
    </AnimatedSection>
  );
}
