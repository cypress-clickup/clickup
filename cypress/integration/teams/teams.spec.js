/// <reference types='Cypress' />
const { getTeams } = require("@api/teams/teamsFunctions");
// const {getTeams} = require("../../clickup/api/teams/teamsFunctions");

describe("Teams endpoint", () => {
  it('Verify that the request "get team" we can obtain the list of teams and members of each team', () => {
    getTeams();
  });
});
