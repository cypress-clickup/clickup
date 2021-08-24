/// <reference types='Cypress' />
const spaceJson = require('@fixtures/space/space.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createSpaceAsPreRequisiteGetListIds } = require('@api/prerequisites')

describe('Test to get Spaces', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        createSpaceAsPreRequisiteGetListIds().then((ids) => {
            spaceId = ids.spaceId
            teamId = ids.teamId
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
        sendRequest(methods.GET,replaceIdUrl(endpointSpace.spaceid,spaceId))
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
        sendRequest(methods.GET,replaceIdUrl(endpointSpace.spaceById,spaceBadJson.id))
        .should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceId))
    })
})
