/// <reference types='Cypress' />

describe('description', () => {

    let listId = ''
    before(() => {
        getIdList().then((response) => {
            listId = response.body.id
        })
    })

    it.only('Verify that the request "get team" we can obtain the list of teams and members of each team', () => {
        feature.create(`/list/${listId}/task`, spaceJson).then((response) => {
            console.log("task", response)
            console.log(response.body.id)
        })
    })

    afterEach(() => {
        deleteSpace()
    })
})