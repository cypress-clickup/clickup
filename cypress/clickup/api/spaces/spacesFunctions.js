const feature = require('@api/features');
const spaceJson = require('@fixtures/space/space.json')
const spaceUpdateJson = require('@fixtures/space/space_update_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

export function getSpaces(teamId) {
    return feature.getAll(replaceIdUrl(endpointSpace.spaceById,teamId))
}

export function getSpace(spaceId) {
    return feature.getOne(endpointSpace.space,spaceId)
}

export function createSpace(teamId) {
    return feature.create(replaceIdUrl(endpointSpace.spaceById ,teamId), spaceJson)
}

export function updateSpace(spaceId) {
    return feature.put(endpointSpace.space,spaceId, spaceUpdateJson)
}

export function deleteSpace(spaceId) {
    return feature.deleteOne(endpointSpace.space, spaceId)
}
