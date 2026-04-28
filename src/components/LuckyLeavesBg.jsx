import React from 'react';
import { motion } from 'framer-motion';

const CloverIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    {/* Four leaves of a lucky clover */}
    <path d="M50 50 C35 30 35 15 50 15 C65 15 65 30 50 50 Z" />
    <path d="M50 50 C70 35 85 35 85 50 C85 65 70 65 50 50 Z" />
    <path d="M50 50 C65 70 65 85 50 85 C35 85 35 70 50 50 Z" />
    <path d="M50 50 C30 65 15 65 15 50 C15 35 30 35 50 50 Z" />
    {/* Small stem */}
    <path d="M50 50 Q55 60 52 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Leaf = ({ delay, size, initialPos }) => {
  return (
    <motion.div
      initial={{ 
        x: initialPos.x, 
        y: initialPos.y, 
        rotate: 0, 
        opacity: 0,
        scale: 0.5 
      }}
      animate={{ 
        y: [initialPos.y, initialPos.y - 200, initialPos.y],
        x: [initialPos.x, initialPos.x + 50, initialPos.x],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.4, 0.4, 0],
        scale: [0.5, 1.2, 1.2, 0.5]
      }}
      transition={{ 
        duration: 20 + Math.random() * 20, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut" 
      }}
      className="absolute pointer-events-none text-emerald-400/30 blur-[1px] drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      style={{ width: size, height: size }}
    >
      <CloverIcon className="w-full h-full" />
    </motion.div>
  );
};

const LuckyLeavesBg = () => {
  const leaves = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: i * 4,
    size: 150 + Math.random() * 300,
    pos: {
      x: Math.random() * 100 + "%",
      y: 80 + Math.random() * 20 + "%"
    }
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>
      
      {leaves.map((leaf) => (
        <Leaf 
          key={leaf.id} 
          delay={leaf.delay} 
          size={leaf.size} 
          initialPos={leaf.pos} 
        />
      ))}
    </div>
  );
};

export default LuckyLeavesBg;
