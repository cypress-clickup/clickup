const {getLists} = require("../../clickup/api/list/listFunctions");
const listJson = require("../../fixtures/list/list.json");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites");

describe('get all lists', () => {
    let spaceId = ''
    let folderId = ''
    let listId = ''
    before(() => {
        createListAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
            listId = ids.listId
        })
    })

    it('Verify that it can be possible to get all existing lists', () => {
        getLists(folderId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.lists[0].name).to.eq(listJson.name)
            })
    })

    it('', () => {
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
