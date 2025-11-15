/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",

    // 通常の Vitest対象：test が含まれるファイルだけ
    include: ["src/**/*test.ts", "src/**/*test.tsx"],

    // Storybook と分離する
    projects: [
      // Project A: 通常のコンポーネントテスト
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*test.ts", "src/**/*test.tsx"],
        }
      },

      // Project B: Storybookのstoriesをテスト
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
