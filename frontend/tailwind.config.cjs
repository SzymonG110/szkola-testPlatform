/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.tsx"
    ],
    theme: {
        extend: {
            colors: {
                'ownGray': '#726E75',
                'ownGreen': '#3FA34D',
                'ownBlue': '#2E5EAA',
                'ownBlueHover': '#2A497A'
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: []
}
