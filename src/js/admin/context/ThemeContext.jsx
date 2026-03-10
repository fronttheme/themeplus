/**
 * ThemePlus Theme Context
 *
 * File: src/js/admin/context/ThemeContext.jsx
 */

import {createContext, useContext, useState, useEffect} from '@wordpress/element';

// Create context with default value
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {
  },
});

/**
 * Theme Provider Component
 */
export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('themeplus-theme');
    return savedTheme || 'light';
  });

  /**
   * Toggle theme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeplus-theme', newTheme);
      return newTheme;
    });
  };

  /**
   * Apply theme to document
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-themeplus-theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;