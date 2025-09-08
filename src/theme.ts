export const theme = {
  colors: {
    text: '#ffffff',
    mutedText: 'rgba(255,255,255,0.8)',
    bg: '#090a0f',
    cardBorderA: 'rgba(14,165,233,0.6)',
    cardBorderB: 'rgba(168,85,247,0.6)',
    cardBgA: 'rgba(14,165,233,0.12)',
    cardBgB: 'rgba(168,85,247,0.12)',
    pillBg: 'rgba(255,255,255,0.1)',
    pillBorder: 'rgba(255,255,255,0.18)',
    link: '#8bdaff',
    linkHover: '#22d3ee',
  },
  radii: {
    sm: 10,
    md: 14,
    lg: 16,
    xl: 20,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  shadows: {
    card: '0 12px 40px rgba(0,0,0,0.45)',
    cardHover: '0 16px 60px rgba(0,0,0,0.55)',
  },
}

export type Theme = typeof theme

