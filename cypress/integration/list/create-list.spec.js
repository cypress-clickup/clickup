const listJson = require("../../fixtures/list/list.json");
const {createFolderAsPreRequisite, createList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('create a list', () => {
    let spaceId = ''
    let folderId = ''
    beforeEach(() => {
        createFolderAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
        })
    })

    it('should create a list', () => {
        createList(folderId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
                return response.body.id
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
