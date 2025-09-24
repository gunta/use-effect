import React from 'react';
import { 
  Download, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Zap, 
  Github, 
  Twitter, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ExternalLink,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const icons = {
  download: Download,
  alert: AlertTriangle,
  trending: TrendingUp,
  dollar: DollarSign,
  zap: Zap,
  github: Github,
  twitter: Twitter,
  book: BookOpen,
  alertCircle: AlertCircle,
  check: CheckCircle,
  x: XCircle,
  info: Info,
  external: ExternalLink,
  chevronDown: ChevronDown,
  arrow: ArrowRight,
};

interface IconDisplayProps {
  icon: keyof typeof icons;
  className?: string;
  size?: number;
}

export const IconDisplay: React.FC<IconDisplayProps> = ({ 
  icon, 
  className = '',
  size = 24
}) => {
  const Icon = icons[icon];
  
  return Icon ? <Icon className={className} size={size} /> : null;
};
