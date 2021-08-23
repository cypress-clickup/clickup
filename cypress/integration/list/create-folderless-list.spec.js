const listJson = require("../../fixtures/list/list.json");
const {createSpaceAsPreRequisite, createFolderLessList} = require("../../clickup/api/list/listFunctions");
const {deleteSpace} = require("../../clickup/api/spaces/spacesFunctions");

describe('create a folder less list', () => {
    let spaceId = ''
    beforeEach(() => {
        createSpaceAsPreRequisite().then((id) => {
            spaceId = id
        })
    })

    it('should create a folder less list', () => {
        createFolderLessList(spaceId)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(listJson.name)
                return response.body.id
            })
    })

    afterEach(() => {
        deleteSpace(spaceId)
    })
})
