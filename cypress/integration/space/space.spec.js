const feature = require('../../clickup/api/features')
const spaceJson = require('../../fixtures/space/space.json')
describe('Create a Space with team', () => {

    let teamId = ''
    let spaceId = ''
    before(() => {
        feature.getAll('/team').then((response) => {
            teamId = response.body.teams[0].id
        })
    })

    it.only('should create it with necessary attributes', () => {
        feature.create(`/team/${teamId}/space`, spaceJson).then((response) => {
            spaceId = response.body.id
        })
    })

    afterEach(() => {
        feature.deleteOne('/space', spaceId)
    })
})