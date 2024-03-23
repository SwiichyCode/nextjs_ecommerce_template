const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],

  printWidth: 80,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$', // Absolute imports
    '^[./].*(?<!\\.(c|le|sc)ss)$',
    '^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
