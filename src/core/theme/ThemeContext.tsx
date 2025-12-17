import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AppColors, DarkColors, LightColors } from './app_theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    mode: ThemeMode;
    isDark: boolean;
    colors: AppColors;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>('system');

    const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

    const colors = useMemo(() => (isDark ? DarkColors : LightColors), [isDark]);

    const value = useMemo(
        () => ({
            mode,
            isDark,
            colors,
            setMode,
        }),
        [mode, isDark, colors]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return ctx;
};
