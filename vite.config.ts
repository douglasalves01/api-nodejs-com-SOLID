import { defineConfig } from 'vitest/config'
import tsconfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  // fazer o vitest entender a importacao com @
  plugins: [tsconfigPath()],
})
