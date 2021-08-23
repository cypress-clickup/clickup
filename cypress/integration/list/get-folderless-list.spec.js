const feature = require("../../clickup/api/features");
const {createFolderLessList} = require("../../clickup/api/list/prerequisites-list");
const listJson = require("../../fixtures/list/list.json");

describe('get a folder less list', () => {
    let spaceId = ''
    let listId = ''
    beforeEach(() => {
        createFolderLessList().then((ids) => {
            spaceId = ids.spaceId
            listId = ids.listId
        })
    })

    it('should get a folder less list', () => {
        feature.getOne(`/list/`, listId)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
            })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})