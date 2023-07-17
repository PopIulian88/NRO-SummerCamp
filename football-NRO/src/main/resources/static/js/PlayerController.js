const baseURL = "http://localhost:8090/players";

let playerList = [];
let teamAllList = [];

$(document).ready(async function(){
    await fetchPlayerData();
    await fetchAllTeamData();

    //Ca sa se updateze echipele care exista
    var dropdown = document.getElementById("team-dropDown");


    var optionNull1 = document.createElement("option");
    optionNull1.text = "Fara echipa";
    optionNull1.value = null;

    var optionNull2 = document.createElement("option");
    optionNull2.text = "Fara echipa";
    optionNull2.value = null;

    dropdown.add(optionNull1);

    for(var currentTeam of teamAllList) {
        var optionText = currentTeam.name;
        var option = document.createElement("option");

        option.text = optionText;
        option.value = currentTeam.id;

        dropdown.add(option);
    }


    var dropdownEdit = document.getElementById("team-dropDown-edit");
    dropdownEdit.add(optionNull2);

    for(var currentTeam of teamAllList) {
        var optionText = currentTeam.name;
        var option = document.createElement("option");

        option.text = optionText;
        option.value = currentTeam.id;

        dropdownEdit.add(option);
    }
})

async function fetchAllTeamData(){
    const responseJson = await fetch(
        "http://localhost:8090/teams",
        {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

    teamAllList = await responseJson.json();

    if(responseJson.ok){
        console.log("S-au extras echipele");
    }else{
        console.log("Echipele nu sa extras bine");
    }
}

async function fetchPlayerData(){
    const responseJson = await fetch(
        baseURL,
        {
            method: "GET",
                headers: {
                'Content-Type' : 'application/json'
                },
        });

    playerList = await responseJson.json();

    if(responseJson.ok){
        console.log(playerList);
        createPlayerTable();
    }else{
        console.log("an error has ocurred");
    }
}


document.getElementById("create_player_button").addEventListener("click", function (){
    $('#myCreatePlayerModal').modal('show');
});

document.getElementById("closeChanges").addEventListener("click", function(){
    document.getElementById("name").value = "";
    document.getElementById("goalsScored").value = "";

    $('#myCreatePlayerModal').modal('hide');
});

document.getElementById("saveChanges").addEventListener("click", function (){
    var name = document.getElementById("name").value;
    var goalsScored = document.getElementById("goalsScored").value;
    var role = document.getElementById("roleCard").value;
    var teamId = document.getElementById("team-dropDown").value;

    savePlayer(name, goalsScored, role, teamId);

    document.getElementById("name").value = "";
    document.getElementById("goalsScored").value = "";

    $('#myCreatePlayerModal').modal('hide');

})

async function savePlayer(nume, goalsScored, role, teamId){
    //console.log(team);

    var listPosition = 0;

    while(listPosition < teamAllList.length && teamAllList[listPosition].id != teamId){
        listPosition++;
    }

    console.log(listPosition);

    const responsJson = await fetch(
        baseURL + "/save",
        {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "name": nume,
                "goalsScored": goalsScored,
                "role": role,
                "team": (teamId === "null") ? null : {
                    "id": teamId,
                    "name": teamAllList[listPosition].name,
                    "goalScored": teamAllList[listPosition].goalScored,
                    "goalsReceived": teamAllList[listPosition].goalsReceived,
                    "victories": teamAllList[listPosition].victories,
                    "defeats": teamAllList[listPosition].defeats,
                    "draws": teamAllList[listPosition].draws
                }
            })
        });

    if(responsJson.ok){
        console.log("Salvare corecta");
        fetchPlayerData();
    }else{
        console.log("Ceva nu sa SALVAT bine");
    }


    document.getElementById("name").value = "";
    document.getElementById("goalsScored").value = "";
}

function createPlayerTable(){
    const table = $("#players-table tbody");
    table.empty();

    playerList.sort(compareFn);
    console.log(playerList);

    for(const player of playerList){
        const newPlayerTr = document.createElement("tr");

        createElementFromAttritute(player.id, newPlayerTr);
        createElementFromAttritute(player.name, newPlayerTr);
        createElementFromAttritute(player.goalsScored, newPlayerTr);
        createElementFromAttritute(player.role, newPlayerTr);
        if(player.team) {
            createElementFromAttritute(player.team.name, newPlayerTr);
        }else{
            createElementFromAttritute(null, newPlayerTr);
        }
        createButtonPlayer(player, newPlayerTr);

        table.append(newPlayerTr);
    }
}

function compareFn(a, b){
    if(a.goalsScored > b.goalsScored)
        return -1;
    else if(a.goalsScored < b.goalsScored)
        return 1;
    else
        return 0;
}

function createElementFromAttritute(atribute, parent){
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p>${atribute}</p>`;
    parent.appendChild(openCell);
}

function createButtonPlayer(player, parent){
    const myButton = document.createElement("td");

    myButton.innerHTML = `<button type="button" class="btn btn-danger" onclick=deletePlayer(${player.id}) >Delete</button>
                        <button type="button" class="btn btn-light" onclick=editPlayerButton(${player.id})>Edit</button>`
    parent.appendChild(myButton);
}

async function deletePlayer(teamId){
    const responseJson = await fetch(
        baseURL + "/delete/" + teamId,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    if(responseJson.ok){
        console.log("Sa sters bine");
        fetchPlayerData();
    }else{
        console.log("Mare eroare la STERGERE");
    }
}

function editPlayerButton(playerId){
    document.getElementById("idCurent").value = playerId;

    $('#myEditPlayerModal').modal('show');
}

document.getElementById("closeChangesEdit").addEventListener("click", function(){
    document.getElementById("nameEdit").value = "";
    document.getElementById("goalsScoredEdit").value = "";

    $('#myEditPlayerModal').modal('hide');
});

document.getElementById("saveChangesEdit").addEventListener("click", function (){
    var id = document.getElementById("idCurent").value;
    var nume = document.getElementById("nameEdit").value;
    var goalScored = document.getElementById("goalsScoredEdit").value;
    var role = document.getElementById("roleCardEdit").value;
    var teamId = document.getElementById("team-dropDown-edit").value;


    editPlayer(id, nume, goalScored, role, teamId);


    $('#myEditPlayerModal').modal('hide');
    document.getElementById("nameEdit").value = "";
    document.getElementById("goalsScoredEdit").value = "";
});

async function editPlayer(id, nume, goalScored, role, teamId){

    var listPosition = 0;

    while(listPosition < teamAllList.length && teamAllList[listPosition].id != teamId){
        listPosition++;
    }

    const responseJson = await fetch(
        baseURL + "/" + id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "name": nume,
                "goalsScored": goalScored,
                "role": role,
                "team": (teamId === "null") ? null : {
                    "id": teamId,
                    "name": teamAllList[listPosition].name,
                    "goalScored": teamAllList[listPosition].goalScored,
                    "goalsReceived": teamAllList[listPosition].goalsReceived,
                    "victories": teamAllList[listPosition].victories,
                    "defeats": teamAllList[listPosition].defeats,
                    "draws": teamAllList[listPosition].draws
                }
            })
        });

    if(responseJson.ok){
        console.log("S-a editat player-ul");
        fetchPlayerData();
    }else{
        console.log("Ceva nu sa EDITAT bine");
    }
}

