const listJson = require("../../fixtures/list/list.json")
const listErrorMessage = require('../../fixtures/list/listErrors.json')
const methods = require("../../fixtures/endpoint/methods.json")
const {createFolderAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointSpace = require("../../fixtures/endpoint/space.json")
const endpointList = require("../../fixtures/endpoint/list.json")

describe('Create a list', () => {
    let spaceId = ''
    let folderId = ''
    let teamId = ''

    before(() => {
        createFolderAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
            teamId = ids.teamId
        })
    })

    it('Verify that it can be possible to create a list with required fields', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointList.listById, folderId), listJson)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    it('Verify a list can not be created without specifying a name', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointList.listById, folderId), listJson)
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.err).to.be.eq(listErrorMessage.errors.duplicate.err)
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
