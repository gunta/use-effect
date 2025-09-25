import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeHint {
  text: string;
  docs?: string;
  position: { line: number; start: number; end: number };
}

const codeExample = `
// Hover over variables to see types!
const message: string = "Don't useEffect";
const spacesAdded: number = 1;
const solution: Effect<string, never, never> = Effect.succeed("use Effect");

// This function has full type safety
function preventOutage(removeUseEffect: boolean): string {
  if (removeUseEffect) {
    return "Production saved! 🎉";
  }
  return "Another incident report... 😭";
}

const result = preventOutage(true);
`.trim();

// Mock type hints for demo
const typeHints: TypeHint[] = [
  { 
    text: 'const message: string', 
    docs: 'A string containing our campaign message',
    position: { line: 1, start: 6, end: 13 }
  },
  { 
    text: 'const spacesAdded: number', 
    docs: 'The number of spaces that save your production',
    position: { line: 2, start: 6, end: 17 }
  },
  { 
    text: 'const solution: Effect<string, never, never>', 
    docs: 'An Effect that always succeeds with a string value',
    position: { line: 3, start: 6, end: 14 }
  },
  {
    text: 'function preventOutage(removeUseEffect: boolean): string',
    docs: 'Prevents production outages by removing useEffect',
    position: { line: 6, start: 9, end: 22 }
  },
  {
    text: 'const result: string',
    docs: 'The result of preventing an outage',
    position: { line: 13, start: 6, end: 12 }
  }
];

export const InteractiveCode: React.FC = () => {
  const [hoveredHint, setHoveredHint] = useState<TypeHint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const lines = codeExample.split('\n');

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-900 to-black">
      <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between bg-black/50">
        <span className="text-sm font-bold text-electric-blue">
          TypeScript
        </span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
      </div>

      <div 
        className="p-4 font-mono text-sm relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setHoveredHint(null)}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="leading-relaxed hover:bg-white/5">
            {line.split(' ').map((word, wordIndex) => {
              // Check if this word is part of a type hint
              const hint = typeHints.find(h => 
                h.position.line === lineIndex + 1 &&
                line.indexOf(word) >= h.position.start - 1 &&
                line.indexOf(word) <= h.position.end
              );

              if (hint) {
                return (
                  <span key={wordIndex}>
                    <span
                      className="cursor-help border-b border-dashed border-electric-blue/50 hover:border-electric-blue hover:text-electric-blue transition-colors"
                      onMouseEnter={() => setHoveredHint(hint)}
                    >
                      {word}
                    </span>
                    {wordIndex < line.split(' ').length - 1 && ' '}
                  </span>
                );
              }

              // Syntax highlighting
              let className = 'text-gray-300';
              if (['const', 'function', 'if', 'return', 'true', 'false'].includes(word)) {
                className = 'text-purple-400';
              } else if (word.startsWith('"') || word.endsWith('"')) {
                className = 'text-green-400';
              } else if (word.includes(':')) {
                className = 'text-electric-blue';
              } else if (word.startsWith('//')) {
                className = 'text-gray-500 italic';
              }

              return (
                <span key={wordIndex}>
                  <span className={className}>{word}</span>
                  {wordIndex < line.split(' ').length - 1 && ' '}
                </span>
              );
            })}
          </div>
        ))}

        {/* Type hint tooltip */}
        <AnimatePresence>
          {hoveredHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute z-50 px-3 py-2 bg-gray-900 border border-electric-blue/50 rounded-md shadow-xl pointer-events-none"
              style={{
                left: Math.min(mousePos.x, window.innerWidth - 400),
                top: mousePos.y - 60,
              }}
            >
              <div className="text-xs text-electric-blue font-mono whitespace-pre">
                {hoveredHint.text}
              </div>
              {hoveredHint.docs && (
                <div className="text-xs text-gray-400 mt-1 max-w-xs">
                  {hoveredHint.docs}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 py-2 bg-black/50 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          💡 Pro tip: With Effect-TS, all of this is type-safe by default. No more "any" types!
        </p>
      </div>
    </div>
  );
};
