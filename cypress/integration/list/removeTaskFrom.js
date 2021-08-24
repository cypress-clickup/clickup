const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
const {createListAsPreRequisite} = require("../../clickup/api/prerequisites");
describe('remove a task from a list', () => {
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

    it('Verify that a task can be removed from a list', () => {
    })

    after(() => {
        deleteSpace(spaceId)
    })
})