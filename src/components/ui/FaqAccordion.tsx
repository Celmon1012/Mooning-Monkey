import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
  /** Index to open on load; omit or pass null for all closed */
  defaultOpen?: number | null;
}

export function FaqAccordion({ items, className = '', defaultOpen = null }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const fillHeight = className.includes('h-full');

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div
      className={`divide-y divide-white/[0.1] rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-md ${
        fillHeight ? 'flex h-full min-h-0 flex-col overflow-y-auto' : 'overflow-hidden'
      } ${className}`}
    >
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={
              fillHeight
                ? isOpen
                  ? 'shrink-0'
                  : 'flex min-h-[2.75rem] flex-1 flex-col'
                : undefined
            }
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className={`flex w-full shrink-0 items-center justify-between gap-3 px-4 py-3 text-left transition-colors sm:px-5 sm:py-3.5 ${
                fillHeight && !isOpen ? 'min-h-[2.75rem] flex-1' : ''
              } ${isOpen ? 'bg-white/[0.05]' : 'hover:bg-white/[0.04]'}`}
              aria-expanded={isOpen}
            >
              <span
                className={`font-display text-sm font-semibold leading-snug sm:text-[15px] ${
                  isOpen ? 'text-white' : 'text-white/90'
                }`}
              >
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 text-cyan-glow"
              >
                <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-white/[0.08] px-4 pb-5 pt-3 text-sm leading-relaxed text-white/60 sm:px-5 sm:pb-6 sm:pt-3.5 sm:text-[14px] sm:leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
