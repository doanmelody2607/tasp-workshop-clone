/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.html', './src/**/*.{njk,md}', './src/assets/js/*.js'],
    darkMode: 'class',
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        blockquote: {
                            fontWeight: 'normal',
                            color: theme('colors.slate.600'),
                        },
                        'blockquote p:first-of-type::before': {
                            content: '',
                        },
                        'blockquote p:last-of-type::after': {
                            content: '',
                        },
                    },
                },
            }),
        },

        screens: {
            sm: '576px',
            // => @media (min-width: 576px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1440px',
            // => @media (min-width: 1440px) { ... }
        },

        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                md: '1rem',
                lg: '2rem',
                xl: '3.75rem',
                '2xl': '6rem',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
