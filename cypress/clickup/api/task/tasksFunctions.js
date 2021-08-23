const feature = require('@api/features');
const taskJson = require('@fixtures/task/task.json')
const taskUpdateJson = require('@fixtures/task/task_update_data.json')
const endpointTask = require('@fixtures/endpoint/task.json')
const {replaceIdUrl} = require('@support/utils/replaceIdUrl')

export function getTasks(listId) {
    return feature.getAll(replaceIdUrl(endpointTask.taskById, listId))
}

export function getTask(listId) {
    return feature.getOne(endpointTask.task, listId)
}

export function createTask(listId) {
    return feature.create(replaceIdUrl(endpointTask.taskById, listId), taskJson)
}

export function updateTask(listId) {
    return feature.put(endpointTask.task, listId, taskUpdateJson)
}

export function deleteTask(taskId) {
    return feature.deleteOne(endpointTask.task, taskId)
}

export function getFiltered(teamId) {
    return feature.getAll(replaceIdUrl(endpointTask.getFiltered, teamId))
}

export function getTime(taskId) {
    return feature.getAll(replaceIdUrl(endpointTask.getTime, taskId))
}
