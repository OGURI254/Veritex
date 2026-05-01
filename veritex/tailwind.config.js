import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#e7f0f6',
                    100: '#c2d8e6',
                    500: '#0B3C5D', // Deep Blue
                    600: '#09304a',
                    900: '#051927',
                },
                secondary: {
                    400: '#e1c662',
                    500: '#D4AF37', // Gold
                    600: '#b8962c',
                },
                accent: {
                    100: '#F1F5F9', // Soft Grey
                },
                darkbg: {
                    100: '#1e293b',
                    200: '#0f172a',
                    300: '#020617',
                }
            }
        },
    },

    plugins: [forms],
};
