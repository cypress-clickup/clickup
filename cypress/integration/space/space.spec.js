const feature = require('../../clickup/api/features')
const spaceJson = require('../../fixtures/space/space.json')
const endpointSpace = require('../../fixtures/endpoint/space.json')
const endpointTeam = require('../../fixtures/endpoint/team.json')
describe('Create a Space with team', () => {

    let teamId = ''
    let spaceId = ''
    before(() => {
        feature.getAll(endpointTeam.team).then((response) => {
            teamId = response.body.teams[0].id
        })
    })

    it('should create it with necessary attributes', () => {
        feature.create(`${endpointTeam.team}/${teamId}${endpointSpace.space}`, spaceJson).then((response) => {
            spaceId = response.body.id
        })
    })

    afterEach(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})