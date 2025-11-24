// Ambient module declarations to avoid TypeScript errors when deps aren't installed.
declare module '@tanstack/react-query';
declare module 'react-router-dom';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';
declare module '@vitejs/plugin-react-swc';
declare module '@metagptx/vite-plugin-source-locator';
declare module 'vite';
declare module 'path';
declare module 'url';
declare module '*.css';
declare module '*.scss';

// Provide a minimal typing for Toaster and others if needed (optional)
declare module 'sonner' {
  export const Toaster: any;
  export const toast: any;
}
