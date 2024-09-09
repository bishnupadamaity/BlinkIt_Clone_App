module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@service': './src/service',
          '@state': './src/state',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
          '@components': './src/components'
        }
      }
    ],
    'react-native-reanimated/plugin',
  ],
};
