/// <reference types='Cypress' />
const spaceJson = require('@fixtures/space/space.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const { getSpaces,getSpace,createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const endpointTeam = require('@fixtures/endpoint/team.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');

describe('Test to get Spaces', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId) 
        })
        sendRequest(methods.GET,endpointTeam.team).then((response) => {
            teamId = response.body.teams[0].id
            sendRequest(methods.POST,replaceIdUrl(endpointSpace.spaceById ,teamId),spaceJson)
        })      
    })

    it('Verify that is possible to get all spaces', () => {      
        sendRequest(methods.GET,replaceIdUrl(endpointSpace.spaceById,teamId))
        .should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.spaces.length).to.be.eq(1);
            expect(response.body.spaces[0].name).to.be.eq(spaceJson.name);
            expect(response.body.spaces[0]).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
            spaceId = response.body.spaces[0].id
        })
    });

    it('Verify that is possible to get one space', () => {
        // getSpace(spaceId)
        sendRequest(methods.GET,replaceIdUrl(endpointSpace.spaceId,teamId))
        .should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(spaceId);
            expect(response.body.name).to.be.eq(spaceJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    });

    it('Verify a space cannot get information in another team space', () => {
        // getSpace(spaceBadJson.id)
        sendRequest(methods.GET,replaceIdUrl(endpointSpace.spaceById,spaceBadJson.id))
        .should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        deleteSpace(spaceId)
    })
})
