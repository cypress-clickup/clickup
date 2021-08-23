const feature = require('@api/features')
const spaceJson = require('@fixtures/space/space.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const endpointTeam = require('@fixtures/endpoint/team.json')
const { createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')

describe('Test to Create Space', () => {

    let teamId = ''
    let spaceId = ''
 
    before(() => {
        feature.getAll(endpointTeam.team)
        .then((response) => teamId = response.body.teams[0].id)
    })

    it('Verify that the request "create space" and sending an object with the space name into the body we can create a space', () => {
        createSpace(teamId)
        .then((response)=>{
            console.log(response)
            spaceid = response.body.id
            console.log(spaceId)
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(spaceJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    })
    
    it('Verify that the request "create space" and sending an object with repeat space name into the body we cannot create that space', () => {
        createSpace(teamId)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.duplicate.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        console.log(spaceId)
        feature.deleteOne(endpointSpace.space, spaceId)
        // deleteSpace(spaceId)
    })
})
