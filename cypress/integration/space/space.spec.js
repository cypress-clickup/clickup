const feature = require('@api/features')
const spaceJson = require('@fixtures/space/space.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const spaceErrorMessage = require('../../fixtures/space/space_errors.json')
const endpointTeam = require('@fixtures/endpoint/team.json')
const { creatSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')


describe('Create a Space with team', () => {

    let teamId = ''
    let spaceId = ''
    let urlSpace = '';

    before(() => {
        feature.getAll(endpointTeam.team).then((response) => {
            teamId = response.body.teams[0].id
        })
    })

    it('Verify that the request "create space" and sending an object with the space name into the body we can create a space', () => {
        urlSpace = replaceIdUrl(endpointSpace.spaceById ,teamId)
        feature.create(urlSpace, spaceJson).then((response) => {
            spaceId = response.body.id
        }).should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(spaceJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    })

    
    it('Verify that the request "create space" and sending an object with repeat space name into the body we cannot create that space', () => {
        urlSpace = replaceIdUrl(endpointSpace.spaceById ,teamId)
        feature.create(urlSpace, spaceJson)
        .then((response) => {
            console.log(response)
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(spaceErrorMessage.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})