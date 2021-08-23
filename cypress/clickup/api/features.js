const methods = require('@fixtures/endpoint/methods.json');

export function getAll(endpoint) {
    const options = {
        "method": methods.GET,
        "url": Cypress.env('BASE_URL') + endpoint,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "failOnStatusCode":false
    }
    return cy.request(options)
}

export function getOne(endpoint, idObject) {
    const options = {
        "method": methods.GET,
        "url": Cypress.env('BASE_URL') + endpoint + '/' + idObject,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "failOnStatusCode":false
    }
    return cy.request(options)
}

export function deleteOne(endpoint, idObject) {
    const options = {
        "method": methods.DELETE,
        "url": Cypress.env('BASE_URL') + endpoint + '/' + idObject,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "failOnStatusCode":false
    }
    return cy.request(options)
}

export function create(endpoint, jsonData) {
    const options = {
        "method": methods.POST,
        "url": Cypress.env('BASE_URL') + endpoint,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "body": jsonData,
        "failOnStatusCode":false
    }
    return cy.request(options)
}

export function put(endpoint, idObject, jsonData) {
    const options = {
        "method": methods.PUT,
        "url": Cypress.env('BASE_URL') + endpoint + '/' + idObject,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "body": jsonData,
        "failOnStatusCode":false
    }
    return cy.request(options)
}
