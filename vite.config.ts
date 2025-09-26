import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Markdown from 'vite-plugin-md'
import {prismjsPlugin} from "vite-plugin-prismjs"
import anchor from "markdown-it-anchor"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.md$/, /\.vue$/],
    }),
    vueDevTools(),
    Markdown({
      markdownItUses:[
        [anchor],
      ],
    }),
    prismjsPlugin({
      languages:"all",
      plugins:['line-numbers'],
      theme:"coy",
      css:true,
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
