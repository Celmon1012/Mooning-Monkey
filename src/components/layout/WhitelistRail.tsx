import { motion } from 'framer-motion';
import { links } from '../../data/assets';

/** Fixed vertical tab on the right — glass panel + Lumia nav typography */
export function WhitelistRail() {
  return (
    <motion.a
      href={links.whitelist}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the whitelist"
      className="whitelist-rail group"
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="whitelist-rail-label rotate-[-90deg] whitespace-nowrap">Whitelist</span>
    </motion.a>
  );
}
