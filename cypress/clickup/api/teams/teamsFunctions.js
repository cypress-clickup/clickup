const feature = require('@api/features');
const endpointTeam = require('@fixtures/endpoint/team.json')
let teamId = ''
export function getTeams() {
    return feature.getAll(endpointTeam.team).then((response) => {
        teamId = response.body.teams[0].id
        expect(response.status).to.eq(200);
        expect(response.body.teams.length).to.be.eq(1);
        expect(response.body.teams[0]).to.have.all.keys(
            'id', 'name', 'color', 'avatar', 'members'
        )
    })
}