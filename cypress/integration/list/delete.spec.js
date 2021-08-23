const {createListAsPreRequisite, deleteList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const listErrorMessage = require("../../fixtures/list/listErrors.json");

describe('delete a list', () => {
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

    it('Verify that with the request “delete a list” with valid ID a specific list will be deleted', () => {
        deleteList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify a list cannot be deleted in another’s team space', () => {
        deleteList(listId)
            .should((response) => {
                expect(response.status).to.eq(401);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.authorized.err);
            })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
