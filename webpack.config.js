const path = require("path")

module.exports = {
    resolve: {
        alias: {
            '@clickup': path.resolve(__dirname, 'cypress/clickup'),
            '@api': path.resolve(__dirname, 'cypress/clickup/api'),
            '@integration': path.resolve(__dirname, 'cypress/intregration'),
            '@support': path.resolve(__dirname, 'cypress/support'),
            '@fixtures': path.resolve(__dirname, 'cypress/fixtures'),
            '@plugins': path.resolve(__dirname, 'cypress/plugins')
        }
    }
}
