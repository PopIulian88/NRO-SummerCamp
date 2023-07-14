const baseURL = "http://localhost:8090";

let teamList = [];
$(document).ready(async function(){
    fetchTeamData();
});

async function fetchTeamData() {
    const responseJson = await fetch(
        baseURL + "/teams",
    {
        method: 'GET',
            headers: {
        'Content-Type': 'application/json'
    },
    });

    teamList = await responseJson.json();
    if (responseJson.ok) {
        console.log(teamList);
        createTeamTable();
    } else {
        console.log("An error has occurred");
    }
}

function createTeamTable() {
    const table = $("#teams-table tbody");
    table.empty();

    for(const  team of teamList) {
        const newTeamTr = document.createElement("tr");

        createElementFromAttribute(team.id, newTeamTr);
        createElementFromAttribute(team.name, newTeamTr);
        createElementFromAttribute(team.goalScored, newTeamTr);
        createElementFromAttribute(team.goalsReceived, newTeamTr);
        createElementFromAttribute(team.victories, newTeamTr);
        createElementFromAttribute(team.defeats, newTeamTr);
        createElementFromAttribute(team.draws, newTeamTr);
        createButtons(team, newTeamTr);

        table.append(newTeamTr);
    }
}

function createElementFromAttribute(atribute, parent){
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p>${atribute}</p>`;
    parent.appendChild(openCell);
}

function createButtons(team, parent){
    const myButton = document.createElement("td");
    myButton.innerHTML = `<button type="button" class="btn btn-danger" onclick="deleteTeam(${team.id})">Delete</button>`
    parent.appendChild(myButton);
}

async function deleteTeam(teamId){
    const responseJson = await fetch(
        baseURL + "/teams/delete/" + teamId,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    if (responseJson.ok) {
        console.log("Sa facut DILITU");
        fetchTeamData();
    } else {
        console.log("An error has occurred");
    }
}