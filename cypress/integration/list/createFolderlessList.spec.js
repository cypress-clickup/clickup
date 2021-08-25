const listJson = require("../../fixtures/list/list.json")
const listErrorMessage = require("../../fixtures/list/listErrors.json")
const {createSpaceAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointSpace = require("../../fixtures/endpoint/space.json")
const endpointList = require("../../fixtures/endpoint/list.json")

describe('Create a folder less list', () => {
    let spaceId = ''

    before(() => {
        createSpaceAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
        })
    })

    it('Verify that it can be possible to create a folder less list with only required fields', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointList.folderLessLists, spaceId), listJson)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify that is not possible to create a folder less list with invalid fields', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointList.folderLessLists, spaceId), listJson)
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.err).to.be.eq(listErrorMessage.errors.duplicate.err)
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
