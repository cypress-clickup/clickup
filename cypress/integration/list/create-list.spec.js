const feature = require("../../clickup/api/features");
const listJson = require("../../fixtures/list/list.json");
const {createFolder} = require("../../clickup/api/list/prerequisites-list");

describe('create a list', () => {
    let spaceId = ''
    let folderId = ''
    beforeEach(() => {
        createFolder().then((ids) => {
            spaceId = ids.spaceId
            folderId = ids.folderId
        })
    })

    it('should create a list', () => {
        feature.create(`/folder/${folderId}/list`, listJson)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
                return response.body.id
            })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})