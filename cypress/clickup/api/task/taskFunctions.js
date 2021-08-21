
const feature = require('../features');
const spaceJson = require('../../../fixtures/space/space.json')

export async function getIdList() {
    let teamId = ''
    let spaceId = ''
    let folderId = ''
    let listId = ''
    let taskId = ''
    teamId = await feature.getAll("/team")
    teamId = teamId.body.teams[0].id
    spaceId = await feature.create(`/team/${teamId}/space`, spaceJson)
    console.log("spaceId1", spaceId)

    spaceId = spaceId.body.teams.id
    console.log("teamId", teamId)
    console.log("spaceId2", spaceId)
}
