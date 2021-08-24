const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const spaceUpdateJson = require('@fixtures/space/space_update_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createSpaceAsPreRequisiteGetListIds } = require('@api/prerequisites')

describe('Tests to update Space', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        createSpaceAsPreRequisiteGetListIds().then((ids) => {
            spaceId = ids.spaceId
            teamId = ids.teamId
        })      
    })

    it('Verify space name can be updated', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointSpace.spaceid, spaceId),spaceUpdateJson)
        .should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(spaceUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    });

    it('Verify a space cannot be updated in another team space', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointSpace.spaceid, spaceBadJson.id))
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
