const feature = require('@api/features')
const taskBadJson = require('@fixtures/task/task_bad_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const taskErrorMessage = require('@fixtures/task/task_errors.json')
const {getTeams} = require("@api/teams/teamsFunctions");
const {createSpace} = require('@api/spaces/spacesFunctions')
const {createFolder} = require('@api/folders/foldersFunctions')
const {createList} = require('@api/list/listsFunctions')
const {createTask, deleteTask} = require('@api/task/tasksFunctions')

describe('Test to Create Task', () => {

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

    it('Verify ', () => {
        deleteTask(taskId).should((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Verify delete', () => {
        deleteTask(taskBadJson.id).should((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(taskErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
