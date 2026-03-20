import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
    { ignores: ['dist/**', 'node_modules/**', 'test-results/**', '*.pdf'] },
    {
        languageOptions: {
            globals: globals.browser, // (covers fetch, setTimeout, document, window, etc.)
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['test/e2e/**/*.js'],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
];
