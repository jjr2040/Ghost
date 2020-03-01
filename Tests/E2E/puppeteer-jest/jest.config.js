module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "http://localhost:2368/ghost",
        Username: "se-mende@uniandes.edu.co",
        Password: "Pruebas123",
        Fullname: "Juan Sebastian Mendez"
    },
    testMatch: [
        "**/tests/**/*.test.js"
    ],
    verbose: true
}