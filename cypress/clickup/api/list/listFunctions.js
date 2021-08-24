import {replaceIdUrl} from "../../../support/utils/replaceIdUrl";
import {getTeams} from "../teams/teamsFunctions";
import {sendRequest} from "../features";

const endpointList = require("../../../fixtures/endpoint/list.json");
const listJson = require("../../../fixtures/list/list.json");
const feature = require("../features");
const {createFolder} = require('../folders/foldersFunctions');
const {createSpace} = require('../spaces/spacesFunctions');
const endpointSpace = require('../../../fixtures/endpoint/space.json')
const endpointFolder = require('../../../fixtures/endpoint/folder.json')
const endpointTeam = require('../../../fixtures/endpoint/team.json')
const spaceJson = require('../../../fixtures/space/space.json')
const folderJson = require('../../../fixtures/folder/folder.json')
const methods = require('../../../fixtures/endpoint/methods.json');

export function getLists(folderId) {
    return feature.getAll(replaceIdUrl(endpointList.lists, folderId))
}

export function getList(listId) {
    return feature.getOne(endpointList.list, listId)
}

export function createList(folderId) {
    return feature.create(replaceIdUrl(endpointList.lists, folderId), listJson)
}

export function deleteList(listId) {
    return feature.deleteOne(endpointList.list, listId)
}

export function updateList(listId) {
    return feature.put(endpointList.list, listId, listJson)
}

export function createFolderLessList(spaceId) {
    return feature.create(replaceIdUrl(endpointList.folderLessLists, spaceId), listJson)
}

export function getFolderLessList(folderId) {
    return feature.getAll(replaceIdUrl(endpointList.folderLessLists, folderId))
}
