const listErrorMessage = require("../../fixtures/list/listErrors.json")
const listBadData = require("../../fixtures/list/listBadData.json")
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointSpace = require("../../fixtures/endpoint/space.json")
const endpointList = require("../../fixtures/endpoint/list.json")

describe('Delete a list', () => {
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

    it('Verify that is possible to delete a list', () => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointList.delete, listId))
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify a list can not be deleted from another’s team space', () => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointList.delete, listBadData.id))
            .should((response) => {
                expect(response.status).to.eq(401);
                expect(response.body.err).to.be.eq(listErrorMessage.errors.authorized.err);
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
