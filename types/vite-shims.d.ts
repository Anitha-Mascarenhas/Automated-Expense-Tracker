/// <reference types="node" />
// Minimal ambient declarations used by vite.config.ts
declare module 'vite' {
  export function defineConfig(config: any): any;
  export default any;
}
declare module '@vitejs/plugin-react-swc' {
  const plugin: any;
  export default plugin;
}
declare module '@metagptx/vite-plugin-source-locator' {
  export function viteSourceLocator(opts?: any): any;
}
declare module 'path' {
  const path: any;
  export default path;
}
declare module 'url' {
  export function fileURLToPath(path: string): string;
}
