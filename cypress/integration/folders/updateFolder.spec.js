const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const folderUpdateJson = require('@fixtures/folder/folder_update_data.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createFolderAsPreRequisiteGetListIds } = require('@api/prerequisites')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");
const endpointFolder = require('@fixtures/endpoint/folder.json')

describe('Tests to update Space', () => {

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

    it('Verify a folder can be updated', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointFolder.folderId,folderId), folderUpdateJson)
        .should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(folderUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify a folder cannot be updated in another team space ', () => {
        sendRequest(methods.PUT,replaceIdUrl(endpointFolder.folderId,spaceBadJson.id), folderUpdateJson)
        .should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
         sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceId))
    })
})
