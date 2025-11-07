import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const useColorMode = () => useContext(ColorModeContext)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode')
    return savedMode || 'light'
  })

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      mode,
    }),
    [mode]
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#667eea' : '#8b9aff',
            light: mode === 'light' ? '#a8b5ff' : '#b4c0ff',
            dark: mode === 'light' ? '#5568d3' : '#667eea',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #8b9aff 0%, #9775d4 100%)',
            vibrant: mode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #764ba2 100%)'
              : 'linear-gradient(135deg, #8b9aff 0%, #f5b0ff 50%, #9775d4 100%)',
            glow: mode === 'light'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(139, 154, 255, 0.2) 0%, rgba(151, 117, 212, 0.2) 100%)',
          },
          secondary: {
            main: mode === 'light' ? '#f093fb' : '#f5b0ff',
            light: mode === 'light' ? '#f5b0ff' : '#ffccff',
            dark: mode === 'light' ? '#e57ef5' : '#f093fb',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #f5b0ff 0%, #ff7a8e 100%)',
            vibrant: mode === 'light'
              ? 'linear-gradient(135deg, #f093fb 0%, #667eea 50%, #f5576c 100%)'
              : 'linear-gradient(135deg, #f5b0ff 0%, #8b9aff 50%, #ff7a8e 100%)',
          },
          success: {
            main: mode === 'light' ? '#10b981' : '#34d399',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
          },
          warning: {
            main: mode === 'light' ? '#f59e0b' : '#fbbf24',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          },
          error: {
            main: mode === 'light' ? '#ef4444' : '#f87171',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
          },
          info: {
            main: mode === 'light' ? '#3b82f6' : '#60a5fa',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
          },
          background: {
            default: mode === 'light' ? '#f5f7fa' : '#0f1419',
            paper: mode === 'light' ? '#ffffff' : '#1c1e24',
            gradient: mode === 'light'
              ? 'linear-gradient(180deg, #f5f7fa 0%, #e3e8f0 100%)'
              : 'linear-gradient(180deg, #0f1419 0%, #1a1d26 100%)',
            vibrant: mode === 'light'
              ? 'linear-gradient(135deg, #f5f7fa 0%, #e3e8f0 50%, #d3dae8 100%)'
              : 'linear-gradient(135deg, #0f1419 0%, #1a1d26 50%, #252931 100%)',
            shimmer: mode === 'light'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(240, 147, 251, 0.05) 50%, rgba(102, 126, 234, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(139, 154, 255, 0.08) 0%, rgba(245, 176, 255, 0.08) 50%, rgba(139, 154, 255, 0.08) 100%)',
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          glass: {
            light: mode === 'light'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(28, 30, 36, 0.7)',
            medium: mode === 'light'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(28, 30, 36, 0.85)',
            dark: mode === 'light'
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(28, 30, 36, 0.95)',
            blur: 'blur(20px)',
          },
          accent: {
            purple: mode === 'light' ? '#a855f7' : '#c084fc',
            pink: mode === 'light' ? '#ec4899' : '#f472b6',
            cyan: mode === 'light' ? '#06b6d4' : '#22d3ee',
            orange: mode === 'light' ? '#f97316' : '#fb923c',
            gradient: mode === 'light'
              ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)'
              : 'linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #22d3ee 100%)',
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: mode === 'light'
          ? [
              'none',
              '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
              '0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)',
              '0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
              '0 12px 24px rgba(0, 0, 0, 0.10), 0 6px 12px rgba(0, 0, 0, 0.05)',
              '0 16px 32px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)',
              '0 20px 40px rgba(0, 0, 0, 0.14), 0 10px 20px rgba(0, 0, 0, 0.07)',
              '0 24px 48px rgba(0, 0, 0, 0.16), 0 12px 24px rgba(0, 0, 0, 0.08)',
              '0 32px 64px rgba(0, 0, 0, 0.18), 0 16px 32px rgba(0, 0, 0, 0.09)',
              '0 40px 80px rgba(0, 0, 0, 0.20), 0 20px 40px rgba(0, 0, 0, 0.10)',
              '0 48px 96px rgba(0, 0, 0, 0.22), 0 24px 48px rgba(0, 0, 0, 0.11)',
              '0 56px 112px rgba(0, 0, 0, 0.24), 0 28px 56px rgba(0, 0, 0, 0.12)',
              '0 64px 128px rgba(0, 0, 0, 0.26), 0 32px 64px rgba(0, 0, 0, 0.13)',
              '0 72px 144px rgba(0, 0, 0, 0.28), 0 36px 72px rgba(0, 0, 0, 0.14)',
              '0 80px 160px rgba(0, 0, 0, 0.30), 0 40px 80px rgba(0, 0, 0, 0.15)',
              '0 88px 176px rgba(0, 0, 0, 0.32), 0 44px 88px rgba(0, 0, 0, 0.16)',
              '0 96px 192px rgba(0, 0, 0, 0.34), 0 48px 96px rgba(0, 0, 0, 0.17)',
              '0 104px 208px rgba(0, 0, 0, 0.36), 0 52px 104px rgba(0, 0, 0, 0.18)',
              '0 112px 224px rgba(0, 0, 0, 0.38), 0 56px 112px rgba(0, 0, 0, 0.19)',
              '0 120px 240px rgba(0, 0, 0, 0.40), 0 60px 120px rgba(0, 0, 0, 0.20)',
              '0 128px 256px rgba(0, 0, 0, 0.42), 0 64px 128px rgba(0, 0, 0, 0.21)',
              '0 136px 272px rgba(0, 0, 0, 0.44), 0 68px 136px rgba(0, 0, 0, 0.22)',
              '0 144px 288px rgba(0, 0, 0, 0.46), 0 72px 144px rgba(0, 0, 0, 0.23)',
              '0 152px 304px rgba(0, 0, 0, 0.48), 0 76px 152px rgba(0, 0, 0, 0.24)',
              '0 160px 320px rgba(0, 0, 0, 0.50), 0 80px 160px rgba(0, 0, 0, 0.25)',
            ]
          : [
              'none',
              '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)',
              '0 4px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.18)',
              '0 8px 16px rgba(0, 0, 0, 0.30), 0 4px 8px rgba(0, 0, 0, 0.20)',
              '0 12px 24px rgba(0, 0, 0, 0.35), 0 6px 12px rgba(0, 0, 0, 0.22)',
              '0 16px 32px rgba(0, 0, 0, 0.40), 0 8px 16px rgba(0, 0, 0, 0.25)',
              '0 20px 40px rgba(0, 0, 0, 0.45), 0 10px 20px rgba(0, 0, 0, 0.28)',
              '0 24px 48px rgba(0, 0, 0, 0.50), 0 12px 24px rgba(0, 0, 0, 0.30)',
              '0 32px 64px rgba(0, 0, 0, 0.55), 0 16px 32px rgba(0, 0, 0, 0.33)',
              '0 40px 80px rgba(0, 0, 0, 0.60), 0 20px 40px rgba(0, 0, 0, 0.35)',
              '0 48px 96px rgba(0, 0, 0, 0.65), 0 24px 48px rgba(0, 0, 0, 0.38)',
              '0 56px 112px rgba(0, 0, 0, 0.70), 0 28px 56px rgba(0, 0, 0, 0.40)',
              '0 64px 128px rgba(0, 0, 0, 0.75), 0 32px 64px rgba(0, 0, 0, 0.43)',
              '0 72px 144px rgba(0, 0, 0, 0.80), 0 36px 72px rgba(0, 0, 0, 0.45)',
              '0 80px 160px rgba(0, 0, 0, 0.85), 0 40px 80px rgba(0, 0, 0, 0.48)',
              '0 88px 176px rgba(0, 0, 0, 0.90), 0 44px 88px rgba(0, 0, 0, 0.50)',
              '0 96px 192px rgba(0, 0, 0, 0.95), 0 48px 96px rgba(0, 0, 0, 0.53)',
              '0 104px 208px rgba(0, 0, 0, 1.00), 0 52px 104px rgba(0, 0, 0, 0.55)',
              '0 112px 224px rgba(0, 0, 0, 1.00), 0 56px 112px rgba(0, 0, 0, 0.58)',
              '0 120px 240px rgba(0, 0, 0, 1.00), 0 60px 120px rgba(0, 0, 0, 0.60)',
              '0 128px 256px rgba(0, 0, 0, 1.00), 0 64px 128px rgba(0, 0, 0, 0.63)',
              '0 136px 272px rgba(0, 0, 0, 1.00), 0 68px 136px rgba(0, 0, 0, 0.65)',
              '0 144px 288px rgba(0, 0, 0, 1.00), 0 72px 144px rgba(0, 0, 0, 0.68)',
              '0 152px 304px rgba(0, 0, 0, 1.00), 0 76px 152px rgba(0, 0, 0, 0.70)',
              '0 160px 320px rgba(0, 0, 0, 1.00), 0 80px 160px rgba(0, 0, 0, 0.73)',
            ],
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundImage: mode === 'light'
                  ? 'linear-gradient(180deg, #f5f7fa 0%, #e3e8f0 100%)'
                  : 'linear-gradient(180deg, #0f1419 0%, #1a1d26 100%)',
                backgroundAttachment: 'fixed',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: mode === 'light'
                    ? '0 6px 16px rgba(102, 126, 234, 0.25), 0 2px 8px rgba(0, 0, 0, 0.08)'
                    : '0 6px 16px rgba(139, 154, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
              },
              contained: {
                background: mode === 'light'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #8b9aff 0%, #9775d4 100%)',
                '&:hover': {
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #5568d3 0%, #63428a 100%)'
                    : 'linear-gradient(135deg, #7a89e6 0%, #8664bb 100%)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light'
                  ? '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.03)'
                  : '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: 16,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: mode === 'light'
                    ? '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)'
                    : '0 8px 24px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },
              elevation1: {
                boxShadow: mode === 'light'
                  ? '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)'
                  : '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)',
              },
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light'
                  ? '0 2px 8px rgba(0, 0, 0, 0.1)'
                  : '0 2px 8px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'light'
                    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.08)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}
