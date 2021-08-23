/// <reference types='Cypress' />
const folderJson = require('@fixtures/folder/folder.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const { createSpace,deleteSpace  } = require('@api/spaces/spacesFunctions')
const { getFolder,getFolders,createFolder } = require('@api/folders/foldersFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");

describe('Test to get Folders', () => {

    let teamId = ''
    let spaceId = ''
    let folderId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response)=>{
                spaceId = response.body.id
                createFolder(spaceId).then((response)=>folderId = response.body.id)
            }) 
        })   
    })

    it('Verify that it is possible to get a list of all folders', () => {
        getFolders(spaceId).should((response)=>{
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
        getFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(folderId);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify a folder cannot get information from another team space', () => {
        getFolder(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        deleteSpace(spaceId)
    })
})
