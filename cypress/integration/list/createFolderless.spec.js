const listJson = require("../../fixtures/list/list.json");
const {createSpaceAsPreRequisite, createFolderLessList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const listErrorMessage = require("../../fixtures/list/listErrors.json");

describe('create a folder less list', () => {
    let spaceId = ''
    before(() => {
        createSpaceAsPreRequisite().then((id) => {
            spaceId = id
        })
    })

    it('Verify that it can be possible to create a folder less list with only required fields', () => {
        createFolderLessList(spaceId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify that is cannot be possible to create a folder less list” with invalid fields ', () => {
        createFolderLessList(spaceId)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.duplicate.err);
            })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
