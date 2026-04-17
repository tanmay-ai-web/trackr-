import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState(null); // 'light' | 'dark' | null

  const activeTheme = manualTheme || (systemScheme === 'dark' ? 'dark' : 'light');

  const value = useMemo(
    () => ({
      scheme: activeTheme,
      colors: colors[activeTheme],
      manualTheme,
      setManualTheme,
      toggleTheme: () => setManualTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      followSystem: () => setManualTheme(null),
    }),
    [activeTheme, manualTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
