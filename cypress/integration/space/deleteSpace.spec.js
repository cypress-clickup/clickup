const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createSpaceAsPreRequisite } = require('@api/prerequisites')

describe('Tests to delete Spaces', () => {

    let spaceId = ''

    before(() => {
         createSpaceAsPreRequisite().then((id) => {
            spaceId = id
        }) 
    })

    it('Verify that it can be possible to delete a specific space', () => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceId))
            .should((response)=>{
                expect(response.status).to.eq(200)
            })
    });

    it('Verify a space cannot be deleted in another team space', () => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceBadJson.id))
            .should((response)=>{
                expect(response.status).to.eq(401);
                expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
                expect(response.body).to.have.all.keys('err', 'ECODE')
            })
    });
})
