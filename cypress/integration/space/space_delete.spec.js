const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const { createSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const spaceBadJson = require('@fixtures/space/space_bad_data.json')

describe('Tests to delete Spaces', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response) => {
                console.log(response)
                spaceId = response.body.id
            }) 
        })   
    })

    it('Verify that the request "delete space" and sending a space_id we can delete a specific space', () => {
        deleteSpace(spaceId).should((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('Verify that the request " delete space" and sending a bad space_id we cannot delete any space', () => {
        deleteSpace(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });
})
