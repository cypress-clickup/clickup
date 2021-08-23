const feature = require('@api/features')
const taskBadJson = require('@fixtures/task/task_bad_data.json')
const endpointSpace = require('@fixtures/endpoint/space.json')
const taskErrorMessage = require('@fixtures/task/task_errors.json')
const {getTeams} = require("@api/teams/teamsFunctions");
const {createSpace} = require('@api/spaces/spacesFunctions')
const {createFolder} = require('@api/folders/foldersFunctions')
const {createList} = require('@api/list/listsFunctions')
const {createTask, getFiltered} = require('@api/task/tasksFunctions')

describe('Test to get Filtered Task', () => {

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

    it('Verify that is possible to get a filtered team tasks', () => {
        getFiltered(teamId).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys(
                'tasks'
            )
        })
    })

    it('Verify a task cannot be got in another’s team space', () => {
        getFiltered(taskBadJson.id).should((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.err).to.be.eq(taskErrorMessage.errors.authorized.err);
            expect(response.body).to.have.all.keys('err', 'ECODE')
        })
    })

    after(() => {
        feature.deleteOne(endpointSpace.space, spaceId)
    })
})
