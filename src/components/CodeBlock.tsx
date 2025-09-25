import React, { useEffect, useState } from 'react';
import { transformerTwoslash } from '@shikijs/twoslash';
import '@shikijs/twoslash/style-rich.css';
import { motion } from 'framer-motion';
import { getHighlighter } from '../lib/highlighter';

interface CodeBlockProps {
  code: string;
  lang?: 'typescript' | 'tsx' | 'javascript' | 'jsx';
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
  title?: string;
  variant?: 'error' | 'success';
  useTwoslash?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  lang = 'typescript',
  showLineNumbers = false,
  theme = 'dark',
  title,
  variant,
  useTwoslash = false,
}) => {
  const [html, setHtml] = useState<string>('');
  const [typeInfo, setTypeInfo] = useState<any>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // YES, we're using useEffect here - ONLY for demonstration purposes!
  // This is to show what NOT to do 😅
  useEffect(() => {
    async function highlight() {
      try {
        const highlighter = await getHighlighter();

        let twoslashMeta: any = null;
        const transformers = useTwoslash
          ? [
              transformerTwoslash({
                rendererRich: {
                  classExtra: 'twoslash-rich',
                },
              }),
              {
                name: 'collect-twoslash-meta',
                pre() {
                  twoslashMeta = this.meta.twoslash ?? null;
                },
              },
            ]
          : undefined;

        const highlighted = highlighter.codeToHtml(code, {
          lang,
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
          ...(transformers ? { transformers } : {}),
        });

        setTypeInfo(useTwoslash ? twoslashMeta : null);
        setHtml(highlighted);
      } catch (error) {
        console.error('Highlighting failed:', error);
        setHtml(`<pre><code>${code}</code></pre>`);
        setTypeInfo(null);
      }
    }

    highlight();
  }, [code, lang, theme, useTwoslash]); // Dependencies that will cause re-renders! 🤦

  const borderColor = variant === 'error' 
    ? 'border-warning-red/30' 
    : variant === 'success' 
    ? 'border-green-400/30'
    : 'border-gray-700';

  const bgGradient = variant === 'error'
    ? 'from-warning-red/10 to-transparent'
    : variant === 'success'
    ? 'from-green-400/10 to-transparent'
    : 'from-gray-900 to-transparent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-lg overflow-hidden border ${borderColor} bg-gradient-to-br ${bgGradient}`}
    >
      {title && (
        <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
          <span className={`text-sm font-bold ${
            variant === 'error' ? 'text-warning-red' : 
            variant === 'success' ? 'text-green-400' : 'text-gray-400'
          }`}>
            {title}
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div 
          className="p-4 overflow-x-auto text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        
        {/* Type information overlay */}
        {typeInfo && hoveredNode !== null && typeInfo.nodes[hoveredNode] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-50 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-xl"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '100%',
              marginTop: '8px',
            }}
          >
            <div className="text-xs text-gray-300 font-mono whitespace-pre">
              {typeInfo.nodes[hoveredNode].text}
            </div>
            {typeInfo.nodes[hoveredNode].docs && (
              <div className="text-xs text-gray-500 mt-1 max-w-sm">
                {typeInfo.nodes[hoveredNode].docs}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {showLineNumbers && (
        <div className="absolute left-0 top-0 h-full w-12 bg-black/20 flex flex-col items-center pt-4 text-xs text-gray-600">
          {code.split('\n').map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
