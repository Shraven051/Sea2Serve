/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': '#0F1F2E',
                'secondary-color': '#0E7490',
                'background-color': '#F5F7FA',
                'accent-color': '#2DD4BF',
                'white': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
