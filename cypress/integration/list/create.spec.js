const listJson = require("../../fixtures/list/list.json");
const listErrorMessage = require('../../fixtures/list/listErrors.json')
const {createList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const {createFolderAsPreRequisite} = require("../../clickup/api/prerequisites");

describe('create a list', () => {
    let spaceId = ''
    let folderId = ''
    before(() => {
        createFolderAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
        })
    })

    it('Verify that it can be possible to create a list with required fields', () => {
        createList(folderId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify a list cannot be created without specifying a name', () => {
        createList(folderId)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.duplicate.err);
            })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
