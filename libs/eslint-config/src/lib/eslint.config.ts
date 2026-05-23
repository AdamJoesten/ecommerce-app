// eslint.config.js
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint'

export const baseConfig = [
	...tseslint.configs.recommended,
	prettier
];
