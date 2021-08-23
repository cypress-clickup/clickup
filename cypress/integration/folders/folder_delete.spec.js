const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const { createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const folderBadJson = require('@fixtures/folder/folder_bad_data.json')
const { createFolder,deleteFolder } = require('@api/folders/foldersFunctions')

describe('Tests to delete Spaces', () => {

    let teamId = ''
    let spaceId = ''
    let folderId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response)=>{
                spaceId = response.body.id
                createFolder(spaceId).then((response) => folderId = response.body.id)
            }) 
        })   
    })

    it('Verify a folder can be deleted', () => {
        deleteFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('Verify a folder cannot be created in another team space', () => {
        deleteFolder(folderBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        deleteSpace(spaceId)
    })
})
