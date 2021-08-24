const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const folderBadJson = require('@fixtures/folder/folder_bad_data.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createFolderAsPreRequisiteGetListIds } = require('@api/prerequisites')
const folderEndpoint = require('@fixtures/endpoint/folder.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");

describe('Tests to delete Spaces', () => {

    let teamId = ''
    let spaceId = ''
    let folderId = ''

    before(() => {
        createFolderAsPreRequisiteGetListIds().then((ids) => {
            spaceId = ids.spaceId
            teamId = ids.teamId
            folderId = ids.folderId
        })    
    })

    it('Verify a folder can be deleted', () => {
        sendRequest(methods.DELETE,replaceIdUrl(folderEndpoint.folderId, folderId))
        .should((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('Verify a folder cannot be created in another team space', () => {
        sendRequest(methods.DELETE,replaceIdUrl(folderEndpoint.folderId, folderBadJson.id))
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
