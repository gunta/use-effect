import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconWithLabelProps {
  icon: LucideIcon;
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const IconWithLabel: React.FC<IconWithLabelProps> = ({ 
  icon: Icon, 
  label, 
  color = 'text-white',
  size = 'md' 
}) => {
  const sizes = {
    sm: { icon: 16, text: 'text-sm' },
    md: { icon: 20, text: 'text-base' },
    lg: { icon: 24, text: 'text-lg' }
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className={color} size={sizes[size].icon} />
      <span className={`${sizes[size].text} ${color} font-medium`}>{label}</span>
    </motion.div>
  );
};
