const spaceErrorMessage = require('@fixtures/space/space_errors.json')
const spaceUpdateJson = require('@fixtures/space/space_update_data.json')
const { createSpace,updateSpace,deleteSpace } = require('@api/spaces/spacesFunctions')
const { getTeams } = require("@api/teams/teamsFunctions");
const spaceBadJson = require('@fixtures/space/space_bad_data.json')

describe('Tests to update Space', () => {

    let teamId = ''
    let spaceId = ''

    before(() => {
        getTeams().then((response)=>{
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response) => spaceId = response.body.id) 
        })   
    })

    it('Verify a space can be updated with a name', () => {
        updateSpace(spaceId).should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(spaceUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
            )
        })
    });

    it('Verify a space cannot be updated in another team space', () => {
        updateSpace(spaceBadJson.id).should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(spaceErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    });

    after(() => {
        deleteSpace(spaceId)
    })
})
