const feature = require('@api/features')
const folderJson = require('@fixtures/folder/folder.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const { createSpace  } = require('@api/spaces/spacesFunctions')
const { createFolder } = require('@api/folders/foldersFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");


describe('Test to Create Folder', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response)=>{
                console.log(response)
                spaceId = response.body.id            
            }) 
        })   
    })

    it('Verify that the request "create folder" and sending a space_id and object with folder name into the body we can create a new folder ', () => {
        createFolder(spaceId).then((response) => {
            folderId = response.body.id
        }).should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    })
    
    it('Verify that the request "create folder" and sending a space_id and object with a repeat folder name into the body we cannot create a new folder ', () => {
        createFolder(spaceId)
        .then((response) => {
            console.log(response)
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.duplicate.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
