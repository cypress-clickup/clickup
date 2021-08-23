const {createFolderLessListAsPreRequisite, getFolderLessList} = require("../../clickup/api/list/listFunctions");
const listJson = require("../../fixtures/list/list.json");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('get all folder less lists', () => {
    let spaceId = ''
    let listId = ''
    before(() => {
        createFolderLessListAsPreRequisite().then((ids) => {
            spaceId = ids.spaceId
            listId = ids.listId
        })
    })

    it('Verify that it can be possible to get information about all folders lists', () => {
        getFolderLessList(spaceId)
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('', () => {
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
