const feature = require('@api/features');
const folderUpdateJson = require('@fixtures/folder/folder_update_data.json')
const folderJson = require('@fixtures/folder/folder.json')
const endpointFolder = require('@fixtures/endpoint/folder.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

let spaceUrl = ''

export function getFolders(spaceId) {
    return feature.getAll(replaceIdUrl(endpointFolder.folderById,spaceId)).then((response) => {
        spaceId = response.body.id
    })
}

export function getFolder(folderId) {
    return feature.getOne(endpointFolder.folder,folderId).then((response) => {
        folderId = response.body.id
    })
}

export function createFolder(spaceId) {
    spaceUrl = replaceIdUrl(endpointFolder.folderById ,spaceId)
    return feature.create(spaceUrl, folderJson).then((response) => {
        spaceId = response.body.id
    })
}

export function updateFolder(folderId) {
    return feature.put(endpointFolder.folder,folderId, folderUpdateJson).then((response) => {
        spaceId = response.body.id
    })
}

export function deleteFolder(folderId) {
    return feature.deleteOne(endpointFolder.folder, folderId)
}
