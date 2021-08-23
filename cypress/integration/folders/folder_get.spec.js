/// <reference types='Cypress' />
const folderJson = require('@fixtures/folder/folder.json')
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const { createSpace  } = require('@api/spaces/spacesFunctions')
const { getFolder,getFolders,createFolder } = require('@api/folders/foldersFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const feature = require('@api/features')

describe('Test to get Folders', () => {

    let teamId = ''
    let spaceId = ''
    let folderId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response)=>{
                console.log(response)
                spaceId = response.body.id
                createFolder(spaceId).then((response)=>{
                    console.log(response)
                    folderId = response.body.id
                })
            }) 
        })   
    })

    it('Verify that the request "get folders" and sending a space_id we can obtain the list of all folders we have already created', () => {
        getFolders(spaceId).should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.folders.length).to.be.eq(1);
            expect(response.body.folders[0].name).to.be.eq(folderJson.name);
            expect(response.body.folders[0]).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
            folderId = response.body.folders[0].id
        })
    });

    it('Verify that the request "get folder" and sending a folder_id we can obtain the all information only about that specific folder', () => {
        getFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(folderId);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify that the request "get folder" and sending a bad folder_id we obtain an error message ', () => {
        getFolder(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
