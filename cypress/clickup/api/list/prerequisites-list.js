import {replaceIdUrl} from "../../../support/utils/replaceIdUrl";
const endpointList = require("../../../fixtures/endpoint/list.json");
const listJson = require("../../../fixtures/list/list.json");
const feature = require( "../features");
const spaceJson = require("../../../fixtures/space/space.json");
const folderJson = require("../../../fixtures/folder/folder.json");

export function createSpace() {
    return feature.getAll("/team")
        .then((response) => {
            return response.body.teams[0].id
        }).then((id) => {
            feature.create(`/team/${id}/space`, spaceJson)
        }).then((response) => {
            return response.body.id
        })
}
export function createFolder() {
    let ids = {}
        return createSpace()
            .then((id) =>{
            ids.spaceId = id
            feature.create(`/space/${id}/folder`, folderJson)
        }).then((response) => {
            ids.folderId = response.body.id
            return ids
        })
}

export function createList() {
    let ids = {}
    return createFolder()
        .then((responsedIds) => {
            ids = responsedIds
            feature.create(replaceIdUrl(endpointList.post, ids.folderId), listJson)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}

export function createFolderLessList() {
    let ids = {}
    return createSpace()
        .then((id) =>{
            ids.spaceId = id
            feature.create(replaceIdUrl(endpointList.postFolderLess, ids.spaceId), listJson)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}
