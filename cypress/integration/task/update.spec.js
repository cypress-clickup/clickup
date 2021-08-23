const feature = require('@api/features')
const taskUpdateJson = require('@fixtures/task/task_update_data.json')
const taskBadJson = require('@fixtures/task/task_bad_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const taskErrorMessage = require('@fixtures/task/task_errors.json')
const {getTeams} = require("@api/teams/teamsFunctions");
const {createSpace} = require('@api/spaces/spacesFunctions')
const {createFolder} = require('@api/folders/foldersFunctions')
const {createList} = require('@api/list/listsFunctions')
const {createTask, updateTask} = require('@api/task/tasksFunctions')

describe('Test to Update Task', () => {

    let teamId = ''
    let spaceId = ''
    let folderId = ''
    let listId = ''
    let taskId = ''

    before(() => {
        getTeams().then((response) => {
            teamId = response.body.teams[0].id
            createSpace(teamId).then((response) => {
                spaceId = response.body.id
                createFolder(spaceId).then((response) => {
                    folderId = response.body.id
                    createList(folderId).then((response) => {
                        listId = response.body.id
                        createTask(listId).then((response) => {
                            taskId = response.body.id
                        })
                    })
                })
            })
        })
    })

    it('Verify that is possible to update a task by id', () => {
        updateTask(taskId).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.be.eq(taskUpdateJson.name)
            expect(response.body).to.have.all.keys(
                'archived', 'assignees', 'attachments', 'checklists', 'creator', 'custom_fields', 'custom_id', 'date_closed', 'date_created', 'date_updated', 'dependencies',
                'description', 'due_date', 'folder', 'id', 'linked_tasks', 'list', 'name', 'orderindex', 'parent', 'permission_level', 'points', 'priority', 'project', 'space', 'start_date', 'status', 'tags', 'team_id', 'text_content', 'time_estimate', 'time_spent', 'url', 'watchers'
            )
        })
    })

    it('Verify that is not  possible to update a task in a list', () => {
        updateTask(taskBadJson.id).should((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(taskErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
