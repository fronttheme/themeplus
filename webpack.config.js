/**
 * ThemePlus Webpack Configuration
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    admin: path.resolve(process.cwd(), 'src/js/admin/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'assets/js'),
    filename: '[name].js',
  },
  
  // Disable source maps in production
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

  // Add externals to prevent bundling WordPress packages multiple times
  externals: {
    '@wordpress/element': 'wp.element',
    '@wordpress/components': 'wp.components',
    '@wordpress/api-fetch': 'wp.apiFetch',
    '@wordpress/i18n': 'wp.i18n',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};