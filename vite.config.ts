import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        /**
         * Split the heavy, rarely-changing vendors into their own chunks so a
         * content edit never invalidates the React or animation bundle.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion') || id.includes('/motion')) return 'vendor-motion'
          if (id.includes('react-hook-form') || id.includes('/zod') || id.includes('@hookform'))
            return 'vendor-forms'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('@radix-ui')) return 'vendor-radix'
          return undefined
        },
      },
    },
  },
})
