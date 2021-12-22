module.exports = {
  extends: ['@showbie/eslint-config-typescript'],

  overrides: [
    {
      files: ['./scripts/*.js', '.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
