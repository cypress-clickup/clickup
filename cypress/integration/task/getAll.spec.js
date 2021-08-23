const feature = require('@api/features')
const taskJson = require('@fixtures/task/task.json')
const taskBadJson = require('@fixtures/task/task_bad_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const taskErrorMessage = require('@fixtures/task/task_errors.json')
const {getTeams} = require("@api/teams/teamsFunctions");
const {createSpace} = require('@api/spaces/spacesFunctions')
const {createFolder} = require('@api/folders/foldersFunctions')
const {createList} = require('@api/list/listsFunctions')
const {createTask, getTasks} = require('@api/task/tasksFunctions')

describe('Test to get Tasks', () => {

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

    it('Verify that is possible to get a list of tasks', () => {
        getTasks(listId).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.tasks.length).to.be.eq(1);
            expect(response.body.tasks[0].name).to.be.eq(taskJson.name);
            expect(response.body.tasks[0]).to.have.all.keys(
                'archived', 'assignees', 'checklists', 'creator', 'custom_fields', 'custom_id', 'date_closed', 'date_created', 'date_updated', 'dependencies',
                'description', 'due_date', 'folder', 'id', 'linked_tasks', 'list', 'name', 'orderindex', 'parent', 'permission_level', 'points', 'priority', 'project', 'space', 'start_date', 'status', 'tags', 'team_id', 'text_content', 'time_estimate', 'url', 'watchers'
            )
        })
    })

    it('Verify a task cannot be obtain in another’s team space', () => {
        getTasks(taskBadJson.id).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.err).to.be.eq(taskErrorMessage.errors.list.notFound);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
