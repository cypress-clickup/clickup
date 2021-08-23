/// <reference types='Cypress' />
const { getTeams } = require("@api/teams/teamsFunctions");

describe("Teams endpoint", () => {
  it('Verify the list of teams and members of each team', () => {
    getTeams().should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.teams.length).to.be.eq(1);
      expect(response.body.teams[0]).to.have.all.keys(
        "id","name","color","avatar","members"
      );
    });
  });
});
