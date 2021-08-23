const listJson = require("../../fixtures/list/list.json");
const {createListAsPreRequisite, updateList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('update a list', () => {
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

    it('should update a list', () => {
        updateList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
