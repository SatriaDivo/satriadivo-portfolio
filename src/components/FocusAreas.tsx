import { motion } from 'motion/react';
import { focusAreas } from '../data/portfolio';

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function FocusAreas() {
  return (
    <ul className="space-y-4 text-xs font-mono">
      {focusAreas.map((area, idx) => (
        <motion.li
          key={area}
          variants={itemVariants}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="flex items-center gap-3"
        >
          <motion.span
            className="text-solder-copper font-bold"
            whileHover={{ scale: 1.3 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'>'}
          </motion.span>
          <motion.span
            className="bg-slate-node text-white px-2 py-1 flex-1 max-w-sm rounded-sm"
            whileHover={{ scale: 1.02, backgroundColor: 'var(--color-solder-copper)' }}
          >
            {area}
          </motion.span>
        </motion.li>
      ))}
    </ul>
  );
}