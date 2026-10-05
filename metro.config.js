const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/.*/,
  /.*[/\\]react-native[/\\]ReactAndroid[/\\]?.*/,
  /.*[/\\]react-native[/\\]ReactiOS[/\\]?.*/
];

module.exports = config;
