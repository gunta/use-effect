import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            '2px 2px 0 #ef4444, -2px -2px 0 #0ea5e9',
            '-2px 2px 0 #ef4444, 2px -2px 0 #0ea5e9',
            '2px -2px 0 #0ea5e9, -2px 2px 0 #ef4444',
            '-2px -2px 0 #ef4444, 2px 2px 0 #0ea5e9',
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {text}
      </motion.span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute top-0 left-0 text-warning-red opacity-70"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
        animate={{
          x: [0, -2, 0, 2],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 text-electric-blue opacity-70"
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
        animate={{
          x: [0, 2, 0, -2],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};
