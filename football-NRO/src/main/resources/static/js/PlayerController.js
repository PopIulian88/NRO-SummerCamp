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

function createPlayerTable(){
    const table = $("#players-table tbody");
    table.empty();

    for(const player of playerList){
        const newPlayerTr = document.createElement("tr");

        createElementFromAttritute(player.id, newPlayerTr);
        createElementFromAttritute(player.name, newPlayerTr);
        createElementFromAttritute(player.goalsScored, newPlayerTr);
        createElementFromAttritute(player.role, newPlayerTr);
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
                        <button type="button" class="btn btn-dark" onclick=editPlayerButton($player.id)>Edit</button>`
    parent.appendChild(myButton);
}