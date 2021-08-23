const feature = require("../../clickup/api/features");
const {createList} = require("../../clickup/api/list/prerequisites-list");

describe('test a endpoint a list', () => {
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

    it('requisites', () => {
        feature.deleteOne(`/list`, listId)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})