const feature = require('@api/features');
const spaceJson = require('@fixtures/space/space.json')
const folderJson = require('@fixtures/folder/folder.json')
const listJson = require('@fixtures/list/list.json')
const endpointTeam = require('@fixtures/endpoint/team.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const replaceIdUrl = require('@support/utils/replaceIdUrl')

let teamId = ''
let spaceId = ''
let spaceUrl = ''
let folderId = ''

export function getSpaces() {
    feature.getAll(endpointTeam.team).then((response) => {
        return teamId = response.body.teams[0].id         
    }).feature.create(replaceIdUrl(endpointSpace.getSpaces,teamId)).then((response) => {
        spaceId = response.body.id
        expect(response.status).to.eq(200);
        expect(response.body.spaces.length).to.be.eq(1);
        expect(response.body.spaces.name).to.be.eq(spaceJson.name);
        expect(response.body.spaces[0]).to.have.all.keys(
            'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
        )
    })
}

export function createSpace(teamId) {
    spaceUrl = replaceIdUrl(endpointSpace.spaceById ,teamId)
    feature.create(spaceUrl, spaceJson).then((response) => {
        spaceId = response.body.id
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.name).to.be.eq(spaceJson.name);
        expect(response.body).to.have.all.keys(
            'id', 'name', 'private', 'statuses', 'multiple_assignees','features','archived'
        )
    }).then((response)=>{
        return spaceId = response.body.id 
    })
}

export function deleteSpace() {
    feature.deleteOne("/space", spaceId)
}
