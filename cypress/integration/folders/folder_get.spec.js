/// <reference types='Cypress' />
const folderJson = require('@fixtures/folder/folder.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')
const methods = require('@fixtures/endpoint/methods.json');
const { createFolderAsPreRequisiteGetListIds } = require('@api/prerequisites')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {sendRequest} = require("@api/features");
const endpointFolder = require('@fixtures/endpoint/folder.json')

describe('Test to get Folders', () => {

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

    it('Verify that it is possible to get a list of all folders', () => {
          sendRequest(methods.GET,replaceIdUrl(endpointFolder.folderById,spaceId))
        .should((response)=>{
            folderId = response.body.folders[0].id
            expect(response.status).to.eq(200);
            expect(response.body.folders.length).to.be.eq(1);
            expect(response.body.folders[0].name).to.be.eq(folderJson.name);
            expect(response.body.folders[0]).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )            
        })
    });

    it('Verify that is possible to get one folder from a list of folders', () => {
        sendRequest(methods.GET,replaceIdUrl(endpointFolder.folderId,folderId))
        .should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(folderId);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify a folder cannot get information from another team space', () => {
        sendRequest(methods.GET,replaceIdUrl(endpointFolder.folderId,spaceBadJson.id))
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
