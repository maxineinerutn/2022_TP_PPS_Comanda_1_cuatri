module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react', 'react-native'
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'comma-spacing': 'error',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'jsx-quotes': [2, 'prefer-single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'spaced-comment': ['error', 'always'],
    'no-debugger': 'error',
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'space-in-parens': ['error', 'always', { exceptions: ['empty', '{}', '()', '[]'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'space-before-blocks': 'error',
    'array-element-newline': ['error', 'consistent'],
    'max-len': ['error', {
      code: 170,
      ignorePattern: '^import\\s.+\\sfrom\\s.+;$'
    }],
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-use-before-define': 'off',
    'import/no-unresolved': [0],
    'import/extensions': [0],
    'no-restricted-syntax': [0],
    'react/react-in-jsx-scope': [0],
    'no-undef': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'font-family-no-missing-generic-family-keyword': 'off',
    'react/display-name': 'off'
  }
};
