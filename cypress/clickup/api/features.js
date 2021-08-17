export function getAll(endpoint) {
    const options = {
        "method": 'GET',
        "url": Cypress.env('BASE_URL') + endpoint,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        }
    }
    return cy.request(options)
}

export function getOne(endpoint, idObject) {
    const options = {
        "method": 'GET',
        "url": Cypress.env('BASE_URL') + endpoint + '/' + idObject,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        }
    }
    return cy.request(options)
}

export function deleteOne(endpoint, idObject) {
    const options = {
        "method": 'DELETE',
        "url": Cypress.env('BASE_URL') + endpoint + '/' + idObject,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        }
    }
    return cy.request(options)
}

export function create(endpoint, jsonData) {
    const options = {
        "method": 'POST',
        "url": Cypress.env('BASE_URL') + endpoint,
        "headers": {
            'Accept': 'application/json',
            'Authorization': Cypress.env('API_TOKEN')
        },
        "body": jsonData
    }
    return cy.request(options)
}
