module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
      '@typescript-eslint',
  ],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
  ],
  parserOptions: {
      tsconfigRootDir: './',
      project: 'tsconfig.json',
      sourceType: 'module'
  },
  overrides: [
    {
      'files': ['*.js'],
      'extends': ['plugin:@typescript-eslint/disable-type-checked']
    }
  ],
  env : {
    es6: true
  },
};