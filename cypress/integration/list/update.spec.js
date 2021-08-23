const listJson = require("../../fixtures/list/list.json");
const {createListAsPreRequisite, updateList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const listErrorMessage = require("../../fixtures/list/listErrors.json");

describe('update a list', () => {
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

    it('Verify that, is can be possible to update a list', () => {
        updateList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify a list cannot be updated in another’s team space', () => {
        updateList(listId)
            .should((response) => {
                expect(response.status).to.eq(401);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.authorized.err);
            })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
