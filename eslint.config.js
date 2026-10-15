import js from '@eslint/js';
import globals from 'globals';
export default [
  { ignores: ['artifacts/**'] },
  js.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.mocha } },
    rules: { 'no-unused-vars': 'error', 'no-constant-condition': ['error', { checkLoops: false }] }
  }
];
