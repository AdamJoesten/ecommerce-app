// eslint.config.js
import { defineConfig } from "eslint/config";

export const baseConfig = defineConfig([
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
		extends: ["@typescript-eslint/recommended"]
	},
]);
