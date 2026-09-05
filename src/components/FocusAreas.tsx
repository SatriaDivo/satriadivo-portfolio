import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';

export function FocusAreas() {
  // Group skills by category
  const groupedSkills = personalInfo.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  // Define preferred rendering order
  const orderedCategories = [
    'AI/ML',
    'Embedded',
    'Cloud',
    'Infrastructure',
    'Language',
    'Web & Mobile',
    'Data',
    'DevOps',
    'Tooling'
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
      {orderedCategories.filter(cat => groupedSkills[cat]).map((category, idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: idx * 0.1 }}
          className="flex flex-col gap-4"
        >
          <h4 className="font-mono text-xs font-bold text-ink-primary uppercase tracking-[0.1em] border-b border-border-subtle pb-2">
            {category}
          </h4>
          <ul className="flex flex-col gap-2">
            {groupedSkills[category].map((skill) => (
              <li key={skill} className="font-body text-sm text-ink-secondary">
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
