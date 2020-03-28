module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "http://localhost:2368/ghost",
        Username: "admin",
        Password: "admin12345",
        Email: "admin@test.com"
    },
    testMatch: [
        "**/tests/**/*.test.js"
    ],
    verbose: true
}