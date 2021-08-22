

export function getTeams() {
    return feature.getAll("/team").then((response) => {
        teamId = response.body.teams[0].id
        expect(response.status).to.eq(200);
        expect(response.body.teams).to.eq(1);
        expect(response.body.teams.length).to.be.eq(1);

    })
}