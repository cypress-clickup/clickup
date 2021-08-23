const feature = require('@api/features')
const endpointSpace = require('@fixtures/endpoint/space.json')
const folderErrorMessage = require('@fixtures/folder/folder_errors.json')
const folderUpdateJson = require('@fixtures/folder/folder_update_data.json')
const { createSpace } = require('@api/spaces/spacesFunctions')
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
                console.log(response)
                spaceId = response.body.id
                createFolder(spaceId).then((response)=>{
                    console.log(response)
                    folderId = response.body.id
                })
            }) 
        })   
    })

    it('Verify that the request "update folder" and sending a folder_id and we can update its information ', () => {
        updateFolder(folderId).should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(folderUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'id', 'name', 'orderindex', 'override_statuses', 'hidden','space','task_count','archived','statuses','lists','permission_level'
            )
        })
    });

    it('Verify that the request "update folder" and sending a bad folder_id and we cannot update any information ', () => {
        updateFolder(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(folderErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
