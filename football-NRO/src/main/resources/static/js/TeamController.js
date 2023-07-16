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
    myButton.innerHTML = `
                <button type="button" class="btn btn-danger" onclick="deleteTeam(${team.id})">Delete</button>
                <button type="button" class="btn btn-light" onclick=editTeamButton(${team.id})>Edit</button>`
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

function editTeamButton(teamId){
    document.getElementById("idCurent").value = teamId;
    //document.getElementById("nameTeam").value = name;
    // document.getElementById("score").value = score;
    // document.getElementById("received").value = received;
    // document.getElementById("victories").value = victories;
    // document.getElementById("defeats").value = defeats;
    // document.getElementById("draws").value = draws;

    $('#myEditTeamModal').modal('show');

}

document.getElementById("editChanges").addEventListener("click", function (){
    var id = document.getElementById("idCurent").value;
    var name = document.getElementById("nameTeam").value;
    var score = document.getElementById("score").value;
    var received = document.getElementById("received").value;
    var victories = document.getElementById("victories").value;
    var defeats = document.getElementById("defeats").value;
    var draws = document.getElementById("draws").value;

    editTeam(id, name, score,  received,victories, defeats, draws);

    document.getElementById("nameTeam").value = "";
    document.getElementById("score").value = "";
    document.getElementById("received").value = "";
    document.getElementById("victories").value = "";
    document.getElementById("defeats").value = "";
    document.getElementById("draws").value = "";
    $('#myEditTeamModal').modal('hide');

})

async function editTeam(teamId, name, goalScored, received, victories, defeats, draws){
    const responseJson = await fetch(
        baseURL + "/teams/update/" + teamId,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": teamId,
                "name": name,
                "goalScored": goalScored,
                "goalsReceived": received,
                "victories": victories,
                "defeats": defeats,
                "draws": draws
            })
        });
    if(responseJson.ok) {
        console.log("Sa EDITAT");
        fetchTeamData();
    }else{
        console.log("Nu sa editat");
    }
}

document.getElementById("closeEdit").addEventListener("click", function (){
    document.getElementById("nameTeam").value = "";
    document.getElementById("score").value = "";
    document.getElementById("received").value = "";
    document.getElementById("victories").value = "";
    document.getElementById("defeats").value = "";
    document.getElementById("draws").value = "";
    $('#myEditTeamModal').modal('hide');
});



// CREATE TEAM

document.getElementById("creare-team").addEventListener("click", function() {
    $('#myModal').modal('show');
});

// Adăugarea unui eveniment de ascultare pentru clic pe butonul de salvare
document.getElementById("saveChanges").addEventListener("click", function() {
    var name = document.getElementById("name").value;

    saveTeam(name);

    // Aici puteți face ceva cu datele introduse (exemplu: le afișăm în consolă)
    console.log("Nume: " + name);

    $('#myModal').modal('hide');
});

document.getElementById("closeChanges").addEventListener("click", function (){
    document.getElementById("name").value = "";
    $('#myModal').modal('hide');
});


async function saveTeam(nume){
    const responeJson = await fetch(
        baseURL + "/teams/save",
        {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "name": nume,
                "goalScored": 0,
                "goalsReceived": 0,
                "victories": 0,
                "defeats": 0,
                "draws": 0
            })
        });

    if(responeJson.ok){
        console.log("Sa salvet sefule");
        fetchTeamData();
    }else{
        console.log("Nu sa SALVAT cu succes");
    }
    document.getElementById("name").value = "";

}
