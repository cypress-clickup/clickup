const feature = require('@api/features');
const spaceJson = require('@fixtures/space/space.json')
const folderJson = require('@fixtures/folder/folder.json')
const listJson = require('@fixtures/list/list.json')
const endpointTeam = require('@fixtures/endpoint/team.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

let teamId = ''
let spaceId = ''
let spaceUrl = ''
let folderId = ''

export function getSpaces(teamId) {
    return feature.getAll(replaceIdUrl(endpointSpace.spaceById,teamId)).then((response) => {
        spaceId = response.body.id
    })
}

export function getSpace(spaceId) {
    return feature.getOne(endpointSpace.space,spaceId).then((response) => {
        spaceId = response.body.id
    })
}

export function createSpace(teamId) {
    spaceUrl = replaceIdUrl(endpointSpace.spaceById ,teamId)
    return feature.create(spaceUrl, spaceJson).then((response) => {
        spaceId = response.body.id
    })
}

export function deleteSpace(spaceId) {
    feature.deleteOne(endpointSpace.space, spaceId)
}
