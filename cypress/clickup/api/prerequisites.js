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
import endpointTask from "../../fixtures/endpoint/task.json";
import taskJson from "../../fixtures/task/task.json";

export function createSpaceAsPreRequisite() {
    let ids = {}
    return sendRequest(methods.GET, endpointTeam.team).then((response) => {
        ids.teamId = response.body.teams[0].id
        return ids.teamId
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
        .then((returnedIds) => {
            ids = returnedIds
            sendRequest(methods.POST, replaceIdUrl(endpointFolder.folderById , ids.spaceId), folderJson)
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
        .then((returnedIds) => {
            ids = returnedIds
            sendRequest(methods.POST, replaceIdUrl(endpointList.folderLessLists ,ids.spaceId), listJson)
        }).then((response) => {
            ids.listId = response.body.id
            return ids
        })
}

export function createTaskAsPreRequisite() {
    let ids = {}
    return createListAsPreRequisite()
        .then((returnedIds) => {
            ids = returnedIds
            sendRequest(methods.POST, replaceIdUrl(endpointTask.taskById ,ids.listId), taskJson)
        }).then((response) => {
            ids.taskId = response.body.id
            return ids
        })
}
