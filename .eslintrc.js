module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  extends: "airbnb",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "babel"],
  rules: {
    "react/jsx-filename-extension": 0,
    "linebreak-style": 0,
    "no-invalid-this": 0,
    "babel/no-invalid-this": 1,
    "arrow-parens": 0,
    "no-debugger": 1,
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0
  }
};