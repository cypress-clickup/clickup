const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const folderUpdateJson = require('@fixtures/folder/folder_update_data.json')
const { createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const spaceBadJson = require('@fixtures/space/space_bad_data.json')
const { createFolder,updateFolder } = require('@api/folders/foldersFunctions')

describe('Tests to update Space', () => {

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

    it('Verify a folder can be updated', () => {
        updateFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(folderUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify a folder cannot be updated in another’s team space', () => {
        updateFolder(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        deleteSpace(spaceId)
    })
})
