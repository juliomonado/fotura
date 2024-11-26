export const theme = {
    colors: {
        white: '#fff',
        black: '#000',
        grayBG_light: '#e5e5e5',
        grayBG_dark: '#111111',
        //neutral
        neutral: (opacity)=> `rgba(245,245,245, ${opacity})`,
        neutralDark: (opacity)=> `rgba(10,10,10, ${opacity})`,
    },
    fontWeights: {
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    radius: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
    }
}