const listJson = require("../../fixtures/list/list.json")
const {createFolderLessListAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl} = require("../../support/utils/replaceIdUrl")
const endpointList = require("../../fixtures/endpoint/list.json")
const endpointSpace = require("../../fixtures/endpoint/space.json")

describe('get all folder less lists', () => {
    let spaceId = ''
    let listId = ''

    before(() => {
        createFolderLessListAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            listId = ids.listId
        })
    })

    it('Verify that it can be possible to get information about all folderless lists', () => {
        sendRequest(methods.GET,replaceIdUrl(endpointList.folderLessLists, spaceId))
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
