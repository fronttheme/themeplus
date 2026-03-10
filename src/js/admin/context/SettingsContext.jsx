/**
 * ThemePlus Settings Context
 *
 * File: src/js/admin/context/SettingsContext.jsx
 */

import {createContext, useContext} from '@wordpress/element';

const SettingsContext = createContext(null);

export function SettingsProvider({children, value}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsContext;