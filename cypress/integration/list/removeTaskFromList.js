const {createTaskAsPreRequisite} = require("../../clickup/api/prerequisites")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdUrl, replaceIdsUrl} = require("../../support/utils/replaceIdUrl")
const endpointList = require("../../fixtures/endpoint/list.json")
const endpointSpace = require("../../fixtures/endpoint/space.json")

describe('Remove a task from a list', () => {
    let spaceId = ''
    let folderId = ''
    let listId = ''
    let taskId = ''

    before(() => {
        createTaskAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
            listId = ids.listId
            taskId = ids.taskId
        })
    })

    it('Verify that a task can be removed from a list', () => {
        sendRequest(methods.DELETE, replaceIdsUrl(endpointList.taskInList , listId, taskId))
    })

    after(() => {
        sendRequest(methods.DELETE, replaceIdUrl(endpointSpace.delete, spaceId))
    })
})