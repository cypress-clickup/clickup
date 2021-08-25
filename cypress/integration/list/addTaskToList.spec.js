const {createTaskAsPreRequisite} = require("../../clickup/api/prerequisites")
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions")
const {sendRequest} = require("../../clickup/api/features")
const methods = require("../../fixtures/endpoint/methods.json")
const {replaceIdsUrl} = require("../../support/utils/replaceIdUrl")
const endpointList = require("../../fixtures/endpoint/list.json")

describe('Add a task to a list', () => {
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

    it('Verify a task can be added to a list', () => {
        sendRequest(methods.POST, replaceIdsUrl(endpointList.taskInList , listId, taskId))
    })

    after(() => {
        deleteSpace(spaceId)
    })
})