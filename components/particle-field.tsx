'use client';

import { motion } from 'framer-motion';

const particles = Array.from({ length: 24 }).map((_, index) => ({
  id: index,
  size: 6 + (index % 5) * 8,
  x: `${(index * 17) % 100}%`,
  y: `${(index * 29) % 100}%`,
  duration: 8 + (index % 7),
  delay: (index % 6) * 0.4,
}));

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white-10 bg-hero-grid">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan/70 to-violet/70 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 12, -8, 0],
            opacity: [0.35, 0.9, 0.35],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}
