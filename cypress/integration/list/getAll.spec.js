const listJson = require("../../fixtures/list/list.json")
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointList = require("../../fixtures/endpoint/list.json")
const endpointSpace = require("../../fixtures/endpoint/space.json")

describe('Get all lists', () => {
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

    it('Verify that it can be possible to get all existing lists', () => {
        sendRequest(methods.GET,replaceIdUrl(endpointList.lists, folderId))
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.lists[0].name).to.eq(listJson.name)
                expect(response.body.lists[0].id).to.eq(listId)
            })
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})
