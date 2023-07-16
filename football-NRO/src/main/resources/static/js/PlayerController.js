const baseURL = "http://localhost:8090/players";

let playerList = [];

$(document).ready(async function(){
    fetchPlayerData();
})

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

//AICI
document.getElementById("create_player_button").addEventListener("click", function (){
    $('#myCreatePlayerModal').modal('show');

//
    var options = {
        "Null": null
    };

// Obținem referința către elementul dropdown din HTML
    var dropdown = document.getElementById("team-dropDown");

// Parcurgem opțiunile și creăm elementele <option> corespunzătoare
    for (var optionText in options) {
        var optionValue = options[optionText];
        var option = document.createElement("option");
        option.text = optionText;
        option.value = optionValue;

        dropdown.add(option);
    }
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
    var team = document.getElementById("team-dropDown").value;

    savePlayer(name, goalsScored, role, team);

    document.getElementById("name").value = "";
    document.getElementById("goalsScored").value = "";

    $('#myCreatePlayerModal').modal('hide');

})

async function savePlayer(nume, goalsScored, role, team){
    console.log(team);
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
                "team": (team === "null") ? null : {
                    "id": team.id,
                    "name": team.name,
                    "goalScored": team.goalScored,
                    "goalsReceived": team.goalsReceived,
                    "victories": team.victories,
                    "defeats": team.defeats,
                    "draws": team.draws
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

//SI AICI
function editPlayerButton(playerId){
    document.getElementById("idCurent").value = playerId;

    //
    var options = {
        "Null": null
    };

// Obținem referința către elementul dropdown din HTML
    var dropdown = document.getElementById("team-dropDown-edit");

// Parcurgem opțiunile și creăm elementele <option> corespunzătoare
    for (var optionText in options) {
        var optionValue = options[optionText];
        var option = document.createElement("option");
        option.text = optionText;
        option.value = optionValue;

        dropdown.add(option);
    }

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
    var team = document.getElementById("team-dropDown-edit").value;


    editPlayer(id, nume, goalScored, role, team);


    $('#myEditPlayerModal').modal('hide');
    document.getElementById("nameEdit").value = "";
    document.getElementById("goalsScoredEdit").value = "";
});

async function editPlayer(id, nume, goalScored, role, team){
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
                "team": (team === "null") ? null : {
                    "id": team.id,
                    "name": team.name,
                    "goalScored": team.goalScored,
                    "goalsReceived": team.goalsReceived,
                    "victories": team.victories,
                    "defeats": team.defeats,
                    "draws": team.draws
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

