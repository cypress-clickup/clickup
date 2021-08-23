const {createFolderLessListAsPreRequisite, getFolderLessList} = require("../../clickup/api/list/listFunctions");
const listJson = require("../../fixtures/list/list.json");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('get a folder less list', () => {
    let spaceId = ''
    let listId = ''
    beforeEach(() => {
        createFolderLessListAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            listId = ids.listId
        })
    })

    it('should get a folder less list', () => {
        getFolderLessList(spaceId)
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
