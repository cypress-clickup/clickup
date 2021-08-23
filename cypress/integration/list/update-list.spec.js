const feature = require("../../clickup/api/features");
const listJson = require("../../fixtures/list/list.json");
const {createList} = require("../../clickup/api/list/prerequisites-list");

describe('update a list', () => {
    let spaceId = ''
    let folderId = ''
    let listId = ''
    beforeEach(() => {
        createList().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
            listId = ids.listId
        })
    })

    it('should update a list', () => {
        listJson.name = 'Updated List Name'
        feature.put(`/list/${listId}`, listJson)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})