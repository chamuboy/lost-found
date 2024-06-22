const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    'ol/control': path.resolve(__dirname, 'node_modules/ol/control.js'),
    'ol/interaction': path.resolve(__dirname, 'node_modules/ol/interaction.js')
  };
  return config;
};
