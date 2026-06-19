// eslint.config.js
import { defineConfig } from "eslint/config";
import { baseConfig } from '@ecommerce/eslint-config'

export default defineConfig([
    ...baseConfig,
    {
        files: ["**/*.ts"]
    },
]);
