// eslint.config.js
import { defineConfig } from "eslint/config";
import baseConfig from '../../eslint.config.mjs'

export default [
    ...baseConfig,
    {
        files: ["**/*.ts"]
    },
];
