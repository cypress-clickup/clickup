const feature = require('../features');
const spaceJson = require('../../../fixtures/space/space.json')
const folderJson = require('../../../fixtures/folder/folder.json')
const listJson = require('../../../fixtures/list/list.json')
const endpointSpace = require('../../../fixtures/endpoint/space.json')
let teamId = ''
let spaceId = ''
let folderId = ''
export function getIdList() {
    return feature.getAll("/team").then((response) => {
        teamId = response.body.teams[0].id
        feature.create(`/team/${teamId}/space`, spaceJson).then((response) => {
            spaceId = response.body.id
            feature.create(`/space/${spaceId}/folder`, folderJson).then((response) => {
                folderId = response.body.id
                feature.create(`/folder/${folderId}/list`, listJson)
            })
        })
    })
}

export function deleteSpace() {
    feature.deleteOne("/space", spaceId)
}
