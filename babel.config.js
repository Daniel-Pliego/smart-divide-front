module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo'], 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],

          alias: {
            '@': './src',
            '@assets': './assets',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
