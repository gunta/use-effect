import { bundledLanguages, createHighlighter, type HighlighterGeneric } from 'shiki';
import type { BundledLanguage, BundledTheme } from 'shiki';

let highlighterPromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light', 'github-dark-dimmed'],
      langs: Object.keys(bundledLanguages),
    });
  }

  return highlighterPromise;
}

export function resetHighlighterCache() {
  highlighterPromise = null;
}
