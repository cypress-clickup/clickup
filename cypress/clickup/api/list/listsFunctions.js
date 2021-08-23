const feature = require('@api/features');
const listJson = require('@fixtures/list/list.json')
const endpointList = require('@fixtures/endpoint/list.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

export function createList(folderId) {
    return feature.create(replaceIdUrl(endpointList.listById, folderId), listJson)
}
