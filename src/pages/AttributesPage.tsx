import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal3D } from '../components/ui/Reveal3D';
import { TiltCard } from '../components/ui/TiltCard';
import { useParallax } from '../components/ui/useParallax';
import { assets } from '../data/assets';
import {
  attributeCategories,
  attributeHero,
  attributeStages,
  type AttributeCategoryId,
} from '../data/attributes';
import '../styles/attributes.css';

type StageId = 1 | 2 | 3 | 4;

function StageTabs({
  active,
  onChange,
}: {
  active: StageId;
  onChange: (id: StageId) => void;
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-6">
      {attributeStages.map((stage, index) => (
        <div key={stage.id} className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => onChange(stage.id as StageId)}
            className={`attr-stage relative ${active === stage.id ? 'attr-stage--active' : ''}`}
          >
            {active === stage.id && (
              <motion.span
                layoutId="attr-stage-indicator"
                className="absolute -inset-x-2 -inset-y-1 rounded-xl bg-cyan-glow/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <div className="attr-stage-label relative z-[1]">
              <p className="attr-stage-heading">{stage.stage}</p>
              <p className="attr-stage-name">{stage.name}</p>
            </div>
          </button>
          {index < attributeStages.length - 1 && <div className="attr-stage-divider" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function CategoryTabs({
  active,
  onChange,
}: {
  active: AttributeCategoryId;
  onChange: (id: AttributeCategoryId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {attributeCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={`attr-category-tab ${active === cat.id ? 'attr-category-tab--active' : ''}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

function TraitCard({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="flex justify-center"
    >
      <TiltCard intensity={8}>
        <motion.div whileHover={{ y: -6 }} className="attr-trait-card w-full max-w-[14rem]">
          <LazyImage
            src={assets.attributes.cardPlaceholder}
            alt={name}
            className="attr-trait-img aspect-square w-full object-cover"
          />
          <p className="px-4 py-4 text-center font-display text-base font-bold text-white sm:text-lg">
            {name}
          </p>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

export function AttributesPage() {
  const [activeStage, setActiveStage] = useState<StageId>(1);
  const [activeCategory, setActiveCategory] = useState<AttributeCategoryId>('fur');
  const heroRef = useRef<HTMLElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);
  const bgY = useParallax(heroRef, ['-6%', '6%']);

  const category = attributeCategories.find((c) => c.id === activeCategory)!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTraits = () => {
    traitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative overflow-hidden bg-void">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pb-20 pt-16 sm:min-h-screen"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.22]"
          style={{ backgroundImage: `url(${assets.attributes.heroBg})`, y: bgY }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/50 to-void" aria-hidden />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal3D immediate>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-brand text-[clamp(2rem,7vw,4rem)] font-semibold gradient-text"
            >
              {attributeHero.title}
            </motion.h1>
            <motion.button
              type="button"
              onClick={scrollToTraits}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="attr-hero-btn group relative mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-b from-[#fa4cf0] to-[#5d15e3] px-8 py-3.5 font-brand text-sm font-bold uppercase text-white sm:text-base"
            >
              {attributeHero.cta}
              <ChevronRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                strokeWidth={2}
              />
            </motion.button>
          </Reveal3D>
        </div>
      </section>

      {/* Stages + traits */}
      <AnimatedSection
        ref={traitsRef}
        mesh="purple"
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage: `url(${assets.attributes.traitsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-void/85" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal3D className="mb-12">
            <StageTabs active={activeStage} onChange={setActiveStage} />
          </Reveal3D>

          <div className="mb-10">
            <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeStage}-${activeCategory}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8"
            >
              {category.traits.map((trait, index) => (
                <TraitCard key={trait} name={trait} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </div>
  );
}
