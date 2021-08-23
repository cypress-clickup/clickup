const feature = require("../../clickup/api/features");
const {createList} = require("../../clickup/api/list/prerequisites-list");
const listJson = require("../../fixtures/list/list.json");

describe('get a list', () => {
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

    it('should get a list', () => {
        feature.getAll(`/folder/${folderId}/list/`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.lists[0].name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})