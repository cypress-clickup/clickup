import {sendRequest} from "./features";
import methods from "../../fixtures/endpoint/methods.json";
import endpointTeam from "../../fixtures/endpoint/team.json";
import {replaceIdUrl} from "../../support/utils/replaceIdUrl";
import endpointSpace from "../../fixtures/endpoint/space.json";
import spaceJson from "../../fixtures/space/space.json";
import endpointFolder from "../../fixtures/endpoint/folder.json";
import folderJson from "../../fixtures/folder/folder.json";
import endpointList from "../../fixtures/endpoint/list.json";
import listJson from "../../fixtures/list/list.json";

export function createSpaceAsPreRequisite() {
    return sendRequest(methods.GET, endpointTeam.team).then((response) => {
        return response.body.teams[0].id
    }).then((id) => {
        sendRequest(methods.POST, replaceIdUrl(endpointSpace.spaceById ,id), spaceJson)
    }).then((response) => {
        return response.body.id
    })
}

export function createSpaceAsPreRequisiteGetListIds() {
    let ids = {}
    return sendRequest(methods.GET, endpointTeam.team).then((response) => {
        let id = response.body.teams[0].id
        ids.teamId = id
        return id
    }).then((id) => {
        sendRequest(methods.POST, replaceIdUrl(endpointSpace.spaceById ,id), spaceJson)
    }).then((response) => {
        ids.spaceId = response.body.id
        return ids
    })
}

export function createFolderAsPreRequisite() {
    let ids = {}
    return createSpaceAsPreRequisite()
        .then((id) => {
            ids.spaceId = id
            sendRequest(methods.POST, replaceIdUrl(endpointFolder.folderById ,id), folderJson)
        }).then((response) => {
            ids.folderId = response.body.id
            return ids
        })
}

export function createListAsPreRequisite() {
    let ids = {}
    return createFolderAsPreRequisite()
        .then((returnedIds) => {
            ids = returnedIds
            sendRequest(methods.POST, replaceIdUrl(endpointList.lists ,ids.folderId), listJson)
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
            sendRequest(methods.POST, replaceIdUrl(endpointList.folderLessLists ,ids.spaceId), listJson)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}