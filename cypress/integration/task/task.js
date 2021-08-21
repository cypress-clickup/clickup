const {getIdList, deleteSpace} = require("../../clickup/api/task/taskFunctions");
const feature = require("../../clickup/api/features");
const spaceJson = require("../../fixtures/space/space.json");

describe('Create a Space with team', () => {

    let listId = ''
    before(() => {
        getIdList().then((response) => {
            listId = response.body.id
        })
    })

    it.only('should create it with necessary attributes', () => {
        feature.create(`/list/${listId}/task`, spaceJson).then((response) => {
            console.log("task", response)
            console.log(response.body.id)
        })
    })

    afterEach(() => {
        deleteSpace()
    })
})