module.exports = {
    extends: [
      'prettier',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      "plugin:prettier/recommended",
      'prettier/@typescript-eslint',
    ],
    env: {
      es6: true,
      node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      project: ['./tsconfig.eslint.json']
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
    }
}