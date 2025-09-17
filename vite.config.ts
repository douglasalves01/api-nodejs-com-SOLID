import { defineConfig } from 'vitest/config'
import tsconfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  // fazer o vitest entender a importacao com @
  plugins: [tsconfigPath()],
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
})
