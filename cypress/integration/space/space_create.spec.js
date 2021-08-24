const feature = require('@api/features')
const spaceJson = require('@fixtures/space/space.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const endpointTeam = require('@fixtures/endpoint/team.json')
const { createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');

describe('Test to Create Space', () => {

    let teamId = ''
    let spaceId = ''
 
    before(() => {
        sendRequest(methods.GET,endpointTeam.team)
        .then((response) => teamId = response.body.teams[0].id)
    })

    it('Verify a space can be created only with name', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointSpace.spaceById ,teamId),spaceJson).should((response)=>{
            spaceId = response.body.id
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(spaceJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    })
    
    it('Verify a new space cannot be created with the same name of another inside the same space', () => {
        sendRequest(methods.POST,replaceIdUrl(endpointSpace.spaceById ,teamId),spaceJson).should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.duplicate.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {     
        sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceId))
    })
})
