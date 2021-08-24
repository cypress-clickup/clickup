const folderJson = require('@fixtures/folder/folder.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const {sendRequest} = require("@api/features");
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createSpaceAsPreRequisiteGetListIds } = require('@api/prerequisites')
const folderEndpoint = require('@fixtures/endpoint/folder.json')
const endpointSpace = require('@fixtures/endpoint/space.json')

describe('Test to Create Folder', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        createSpaceAsPreRequisiteGetListIds().then((ids) => {
            spaceId = ids.spaceId
            teamId = ids.teamId
        }) 
    })

    it('Verify a new folder can be created only with name', () => {
        sendRequest(methods.POST,replaceIdUrl(folderEndpoint.folderById,spaceId),folderJson)
        .should((response)=>{
            folderId = response.body.id
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    })
    
    it('Verify a new folder cannot be created with the same name as another inside the same space', () => {
        sendRequest(methods.POST,replaceIdUrl(folderEndpoint.folderById,spaceId),folderJson)
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.duplicate.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        sendRequest(methods.DELETE,replaceIdUrl(endpointSpace.spaceid, spaceId))
    })
})
