const feature = require('@api/features');
const endpointTeam = require('@fixtures/endpoint/team.json')
let teamId = ''
export function getTeams() {
    return feature.getAll(endpointTeam.team)
}
