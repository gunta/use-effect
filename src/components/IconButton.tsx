import React from 'react';
import { Download, AlertTriangle, TrendingDown, Zap, Github, Twitter, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const icons = {
  download: Download,
  alert: AlertTriangle,
  trending: TrendingDown,
  zap: Zap,
  github: Github,
  twitter: Twitter,
  book: BookOpen,
};

export const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  href,
  variant = 'primary' 
}) => {
  const Icon = icons[icon as keyof typeof icons] || AlertTriangle;
  
  const colors = {
    primary: 'bg-green-400 hover:bg-green-300 text-black',
    secondary: 'bg-electric-blue hover:bg-blue-400 text-white',
    danger: 'bg-warning-red hover:bg-red-400 text-white',
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 px-6 py-3 text-lg font-bold ${colors[variant]} rounded-lg transition-all`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
      <motion.div
        className="absolute inset-0 bg-white rounded-lg opacity-0"
        whileHover={{ opacity: 0.2 }}
      />
    </Component>
  );
};
