import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' }) // add this

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 30000,
    globalSetup: ['./Tests/setup/globalSetup.ts'],
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  plugins: [],
})