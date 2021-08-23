const feature = require('@api/features');
const folderUpdateJson = require('@fixtures/folder/folder_update_data.json')
const folderJson = require('@fixtures/folder/folder.json')
const endpointFolder = require('@fixtures/endpoint/folder.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

export function getFolders(spaceId) {
    return feature.getAll(replaceIdUrl(endpointFolder.folderById,spaceId))
}

export function getFolder(folderId) {
    return feature.getOne(endpointFolder.folder,folderId)
}

export function createFolder(spaceId) {
    return feature.create(replaceIdUrl(endpointFolder.folderById ,spaceId), folderJson)
}

export function updateFolder(folderId) {
    return feature.put(endpointFolder.folder,folderId, folderUpdateJson)
}

export function deleteFolder(folderId) {
    return feature.deleteOne(endpointFolder.folder, folderId)
}
