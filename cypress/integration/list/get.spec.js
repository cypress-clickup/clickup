const {createListAsPreRequisite, getList} = require("../../clickup/api/list/listFunctions");
const listJson = require("../../fixtures/list/list.json");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const listErrorMessage = require("../../fixtures/list/listErrors.json");

describe('get a list', () => {
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

    it('Verify that it can be possible to get information about a specific list', () => {
        getList(listId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify a list cannot be get information in another’s team space', () => {
        getList(listId)
            .should((response) => {
                expect(response.status).to.eq(401);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.authorized.err);
            })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
