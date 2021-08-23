const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const { createSpace } = require('@api/spaces/spacesFunctions')
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
                console.log(response)
                spaceId = response.body.id
                createFolder(spaceId).then((response)=>{
                    console.log(response)
                    folderId = response.body.id
                })
            }) 
        })   
    })

    it('Verify that the request "delete folder" and sending a folder_id and we can delete only a specific folder ', () => {
        deleteFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('Verify that the request "delete folder" and sending a bad folder_id and we cannot update any information ', () => {
        deleteFolder(folderBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });
})
