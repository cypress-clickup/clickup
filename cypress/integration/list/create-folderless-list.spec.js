const feature = require("../../clickup/api/features");
const listJson = require("../../fixtures/list/list.json");
const {createSpace} = require("../../clickup/api/list/prerequisites-list");

describe('create a folder less list', () => {
    let spaceId = ''
    beforeEach(() => {
        createSpace().then((id) => {
            spaceId = id
        })
    })

    it('should create a folder less list', () => {
        feature.create(`/space/${spaceId}/list`, listJson)
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