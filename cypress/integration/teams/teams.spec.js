/// <reference types='Cypress' />
const {sendRequest} = require("@api/features");
const { getTeams } = require("@api/teams/teamsFunctions");
const endpointTeam = require("@fixtures/endpoint/team.json");
const methods = require("@fixtures/endpoint/methods.json");

describe("Teams endpoint", () => {
  it("Verify the list of teams and members of each team", () => {
    sendRequest(methods.GET, endpointTeam.team).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.teams.length).to.be.eq(1);
      expect(response.body.teams[0]).to.have.all.keys(
        "id","name","color","avatar","members"
      );
    });
  });
});
