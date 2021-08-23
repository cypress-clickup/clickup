const folderJson = require('@fixtures/folder/folder.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const { createSpace,deleteSpace  } = require('@api/spaces/spacesFunctions')
const { createFolder } = require('@api/folders/foldersFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");

describe('Test to Create Folder', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response)=>spaceId = response.body.id) 
        })   
    })

    it('Verify a new folder can be created only with name', () => {
        createFolder(spaceId).should((response)=>{
            folderId = response.body.id
            expect(response.status).to.eq(200);
            expect(response.body.name).to.be.eq(folderJson.name);
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    })
    
    it('Verify a new folder cannot be created with the same name as another inside the same space', () => {
        createFolder(spaceId).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.duplicate.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        deleteSpace(spaceId)
    })
})
