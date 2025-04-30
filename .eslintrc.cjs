module.exports = {
  extends: require.resolve('@maxwell-zhai/easyfront/dist/eslint.config.js'),
  ignorePatterns: ['**/node_modules/**', '.eslintrc.cjs'],
  rules: {
     "@typescript-eslint/no-explicit-any": 0
  }
};
