const {createListAsPreRequisite, deleteList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('test a endpoint a list', () => {
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

    it('requisites', () => {
        deleteList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
