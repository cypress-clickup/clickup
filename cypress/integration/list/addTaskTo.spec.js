const {createListAsPreRequisite} = require("../../clickup/api/prerequisites");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");
describe('add a task to a list', () => {
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

    it('Verify a task can be added to a list', () => {
    })

    it('Verify a task cannot be added to list in another’s team space', () => {
    })

    after(() => {
        deleteSpace(spaceId)
    })
})