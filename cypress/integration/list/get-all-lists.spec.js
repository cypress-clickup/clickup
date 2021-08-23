const {createListAsPreRequisite, getLists} = require("../../clickup/api/list/listFunctions");
const listJson = require("../../fixtures/list/list.json");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('get a list', () => {
    let spaceId = ''
    let folderId = ''
    let listId = ''
    beforeEach(() => {
        createListAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
            listId = ids.listId
        })
    })

    it('should get a list', () => {
        getLists(folderId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.lists[0].name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
