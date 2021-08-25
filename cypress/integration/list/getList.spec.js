const listJson = require("../../fixtures/list/list.json")
const listErrorMessage = require("../../fixtures/list/listErrors.json")
const listBadData = require("../../fixtures/list/listBadData.json")
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointSpace = require("../../fixtures/endpoint/space.json")
const endpointList = require("../../fixtures/endpoint/list.json")

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
        sendRequest(methods.GET,replaceIdUrl(endpointList.delete, listId))
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
                expect(response.body.id).to.eq(listId)
            })
    })

    it('Verify that is not possible to obtain the information of a list from another’s team space', () => {
        sendRequest(methods.GET,replaceIdUrl(endpointList.delete, listBadData.id))
            .should((response) => {
                expect(response.status).to.eq(401)
                expect(response.body.err).to.be.eq(listErrorMessage.errors.authorized.err)
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
