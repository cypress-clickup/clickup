const listJson = require("../../fixtures/list/list.json")
const listErrorMessage = require("../../fixtures/list/listErrors.json")
const listBadData = require("../../fixtures/list/listBadData.json")
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointSpace = require("../../fixtures/endpoint/space.json")
const endpointList = require("../../fixtures/endpoint/list.json")

describe('Update a list', () => {
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

    it('Verify that can be possible to update a list', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointList.delete, listId), listJson)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
                expect(response.body.id).to.eq(listId)
            })
    })

    it('Verify a list can not be updated from another’s team space', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointList.delete, listBadData.id), listJson)
            .should((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.err).to.be.eq(listErrorMessage.errors.notFound.err)
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
