const {createListAsPreRequisite, getList} = require("../../clickup/api/list/listFunctions");
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
        getList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
