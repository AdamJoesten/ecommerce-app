// eslint.config.js
import { defineConfig } from "eslint/config";
import { baseConfig } from '@ecommerce/eslint-config'

export default defineConfig([
    {
        files: ["**/*.js"],
        extends: [baseConfig],
    },
]);
