let game_teamAllList = [];

function findTeamById(teamId){
    posiblePosition = 0;
    while(posiblePosition < game_teamAllList.length){
        if(game_teamAllList[posiblePosition].id == teamId){
            return game_teamAllList[posiblePosition];
        }
        posiblePosition++;
    }

    return null;
}

$(document).ready(async function(){
    await game_fetchAllTeamData();

    //Ca sa se updateze echipele care exista
    var dropdown = document.getElementById("match-match1-doropdown");


    var optionNull1 = document.createElement("option");
    optionNull1.text = "Fara echipa";
    optionNull1.value = null;

    var optionNull2 = document.createElement("option");
    optionNull2.text = "Fara echipa";
    optionNull2.value = null;

    dropdown.add(optionNull1);

    for(var currentTeam of game_teamAllList) {
        var optionText = currentTeam.name;
        var option = document.createElement("option");

        option.text = optionText;
        option.value = currentTeam.id;

        dropdown.add(option);
    }

    var dropdownEdit = document.getElementById("match-match2-doropdown");
    dropdownEdit.add(optionNull2);

    for(var currentTeam of game_teamAllList) {
        var optionText = currentTeam.name;
        var option = document.createElement("option");

        option.text = optionText;
        option.value = currentTeam.id;

        dropdownEdit.add(option);
    }
})

async function game_fetchAllTeamData(){
    const responseJson = await fetch(
        "http://localhost:8090/teams",
        {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

    game_teamAllList = await responseJson.json();

    if(responseJson.ok){
        console.log("S-au extras echipele");
    }else{
        console.log("Echipele nu sa extras bine");
    }
}

document.getElementById("play-button").addEventListener("click", function (){
    var matchTeamId1 = document.getElementById("match-match1-doropdown").value;
    var matchTeamId2 = document.getElementById("match-match2-doropdown").value;

    if((matchTeamId1 !== matchTeamId2) && (matchTeamId1 !== "null") && (matchTeamId2 !== "null")) {
        var team1 = findTeamById(matchTeamId1);
        var team2 = findTeamById(matchTeamId2);

        generateRandomScore(team1, team2);
    }


})

function generateRandomScore(team1, team2){

    rez1 = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    rez2 = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

    generateDynamicText(team1, rez1, team2, rez2);

    updateTheTeams(team1, rez1, team2, rez2);

}

function generateDynamicText(team1, rez1, team2, rez2) {


    var text1 = team1.name + " = " +rez1;
    var text2 = team2.name + " = " + rez2;
    document.getElementById("dynamicText1").innerHTML = text1;
    document.getElementById("dynamicText2").innerHTML = text2;

}

async function updateTheTeams(team1, rez1, team2, rez2){
    var v1 = 0, def1 = 0, draw1 = 0;
    var v2 = 0, def2 = 0, draw2 = 0;

    if(rez1 == rez2){
        draw1 = 1;
        draw2 = 1;
    }else if(rez1 > rez2){
        v1 = 1;
        def2 = 1;
    }else{
        def1 = 1;
        v2 = 1;
    }

    const responseJson1 = await fetch(
        "http://localhost:8090/teams/update/" + team1.id,
        {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "id": team1.id,
                "name": team1.name,
                "goalScored": team1.goalScored + rez1   ,
                "goalsReceived": team1.goalsReceived + rez2,
                "victories": team1.victories + v1,
                "defeats": team1.defeats + def1,
                "draws": team1.draws +draw1
            })
        });

    if(responseJson1.ok){
        console.log("ALL GOOD 1");
    }else{
        console.log("Not GOOD 1");
    }

    const responseJson2 = await fetch(
        "http://localhost:8090/teams/update/" + team2.id,
        {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "id": team2.id,
                "name": team2.name,
                "goalScored": team2.goalScored + rez2,
                "goalsReceived": team2.goalsReceived + rez1,
                "victories": team2.victories + v2,
                "defeats": team2.defeats + def2,
                "draws": team2.draws +draw2
            })
        });

    if(responseJson2.ok){
        console.log("ALL GOOD 2");
    }else{
        console.log("Not GOOD 2");
    }
}

