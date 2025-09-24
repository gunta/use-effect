import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingUp, DollarSign, Frown, TrendingUpIcon, Banknote } from 'lucide-react';

interface CounterProps {
  type: 'incident' | 'global' | 'money';
}

export const AnimatedCounter: React.FC<CounterProps> = ({ type }) => {
  const [incidentCounter, setIncidentCounter] = useState(0);
  const [globalCounter, setGlobalCounter] = useState(2847293847);
  const [moneyCounter, setMoneyCounter] = useState(847);

  // Global counter animation - NO useEffect needed! Using requestAnimationFrame
  if (type === 'global') {
    let animationId: number;
    const animate = () => {
      setGlobalCounter(prev => prev + Math.floor(Math.random() * 1000) + 500);
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation on mount
    if (typeof window !== 'undefined') {
      animate();
      // Cleanup would go in a return statement if this were useEffect
      // But we're NOT using useEffect! 😎
    }
  }

  // Money counter animation
  if (type === 'money') {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        setMoneyCounter(prev => prev + Math.random() * 0.1);
      }, 1000);
    }
  }

  // Incident counter reset animation  
  if (type === 'incident') {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        setIncidentCounter(1);
        setTimeout(() => setIncidentCounter(0), 2000);
      }, 10000);
    }
  }

  const configs = {
    incident: {
      icon: AlertCircle,
      title: 'DAYS SINCE LAST\nuseEffect INCIDENT',
      value: incidentCounter,
      color: 'text-warning-red',
      bgColor: 'from-warning-red/20 to-warning-red/5',
      borderColor: 'border-warning-red/30',
      subtitle: "It's always zero",
      subtitleIcon: Frown
    },
    global: {
      icon: TrendingUp,
      title: 'GLOBAL useEffect\nCALLS RIGHT NOW',
      value: globalCounter.toLocaleString(),
      color: 'text-electric-blue', 
      bgColor: 'from-electric-blue/20 to-electric-blue/5',
      borderColor: 'border-electric-blue/30',
      subtitle: 'Growing exponentially',
      subtitleIcon: TrendingUpIcon
    },
    money: {
      icon: DollarSign,
      title: 'MONEY LOST TO\nuseEffect BUGS',
      value: `$${moneyCounter.toFixed(1)}M`,
      color: 'text-green-400',
      bgColor: 'from-green-400/20 to-green-400/5', 
      borderColor: 'border-green-400/30',
      subtitle: 'This year alone',
      subtitleIcon: Banknote
    }
  };

  const config = configs[type];
  const Icon = config.icon;
  const SubtitleIcon = config.subtitleIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${config.bgColor} border ${config.borderColor} rounded-lg p-8 relative overflow-hidden`}
    >
      <motion.div
        className="absolute top-4 right-4 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Icon className="w-24 h-24" />
      </motion.div>
      
      <h3 className={`text-2xl font-bold mb-4 ${config.color} whitespace-pre-line`}>
        {config.title}
      </h3>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={config.value}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="text-6xl md:text-8xl font-black text-white font-mono"
        >
          {config.value}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex items-center justify-center gap-2 mt-4">
        <SubtitleIcon className="w-4 h-4 text-gray-500" />
        <p className="text-gray-500 text-sm">{config.subtitle}</p>
      </div>
    </motion.div>
  );
};
