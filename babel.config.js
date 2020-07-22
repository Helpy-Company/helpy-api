module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],

    ['module-resolver', {
      alias: {
        '@entities': './src/entities',
        '@services': './src/services',
        '@controllers': './src/controllers',
        '@core': './src/core',
        '@shared': './src/shared',
        '@config': './src/config',
        '@infra': './src/infra'
      }
    }]
  ],

  ignore: [
    '**/*.spec.ts'
  ]
}
