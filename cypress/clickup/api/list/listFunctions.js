import {replaceIdUrl} from "../../../support/utils/replaceIdUrl";
import {getTeams} from "../teams/teamsFunctions";

const endpointList = require("../../../fixtures/endpoint/list.json");
const listJson = require("../../../fixtures/list/list.json");
const feature = require("../features");
const {createFolder} = require('../folders/foldersFunctions');
const {createSpace} = require('../spaces/spacesFunctions');

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

export function createSpaceAsPreRequisite() {
    return getTeams().then((response) => {
        return response.body.teams[0].id
    }).then((id) => {
        createSpace(id)
    }).then((response) => {
        return response.body.id
    })
}

export function createFolderAsPreRequisite() {
    let ids = {}
    return createSpaceAsPreRequisite()
        .then((id) => {
            ids.spaceId = id
            createFolder(id)
        }).then((response) => {
            ids.folderId = response.body.id
            return ids
        })
}

export function createListAsPreRequisite() {
    let ids = {}
    return createFolderAsPreRequisite()
        .then((responsedIds) => {
            ids = responsedIds
            createList(ids.folderId)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}

export function createFolderLessListAsPreRequisite() {
    let ids = {}
    return createSpaceAsPreRequisite()
        .then((id) => {
            ids.spaceId = id
            createFolderLessList(ids.spaceId)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}
