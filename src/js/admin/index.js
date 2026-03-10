/**
 * ThemePlus Admin App Entry Point
 *
 * File: src/js/admin/index.js
 */

import {createRoot} from '@wordpress/element';
import App from './App';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('themeplus-root');

  if (root) {
    const appRoot = createRoot(root);
    appRoot.render(<App/>);
  }
});