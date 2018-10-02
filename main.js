function pokeSubmit(random){
    var param = document.getElementById("pokeInput").value.toLowerCase();
    if (random == true) {
        randNumber = Math.floor(Math.random() * 803);
        param = randNumber;
    }
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + param + "/";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": pokeURL,
        "method": "GET",
        "headers": {}
    }
    
    $.ajax(settings).done(function (response) {
        var pokeURL2 = "https://pokeapi.co/api/v2/pokemon-species/" + param + "/";
        var settings2 = {
            "async": true,
            "crossDomain": true,
            "url": pokeURL2,
            "method": "GET",
            "headers": {}
        }
        $.ajax(settings2).done(function (response2) {
            pokeDescriptionFlavors = response2.flavor_text_entries;
            pokeGenus = response2.genera.filter(checkLanguage)[0].genus;
            pokeCaptureRate = response2.capture_rate;
            pokeDescriptionEngFlavors = pokeDescriptionFlavors.filter(checkLanguage);
            pokeDescription = pokeDescriptionEngFlavors[0].flavor_text;
            console.log(response.id);
            pokeName = response.name;
            pokeName = capFirst(pokeName);
            pokeHeight = response.height;
            pokeWeight = response.weight;
            pokeID = response.id;
            pokeMoves = response.moves;
            pokeMoves = pokeMoves.slice(0,5);
            pokeAbilities = response.abilities;
            pokeType = response.types[0].type.name;
            pokeType = pokeType.toUpperCase();
            pokeStats = response.stats;

            var html = "<div id=\"poke-card\" class=\"card text-white bg-primary mb-3\"><div class=\"card-header\"><h2 class=\"type-heading\">" + pokeName + "</h2></div>";
            html += "<div class=\"card-body\"><div id=\"img-and-stats\"><img id=\"img-poke\" src=\"" + response.sprites.front_default + "\"><div id=\"type-and-id-and-stats\"><div id=\"type-and-id\"><div id=\"pokeType\">" + pokeType + "</div><div id=\"pokeID\">#" + pokeID + "</div>";
            html += "</div><div id=\"stats\">";
            for (var i = 0; i < pokeStats.length; i++) {
                var currStateName = pokeStats[i].stat.name;
                currStateName = capFirst(currStateName);
                if (currStateName == "Special-defense") {
                    currStateName = "Sp-defense";
                }
                if (currStateName == "Special-attack") {
                    currStateName = "Sp-attack";
                }
                html += "<p class=\"statName\">" + currStateName + ": </p><p class=\"statNum\">" + pokeStats[i].base_stat + "</p><br>";
            }
            html += "</div></div></div>";
            html += "<h4 class=\"type-heading\">" + pokeGenus + "</h4>";
            html += "<p>" + pokeDescription + "</p>";
            html += "<h4 class=\"type-heading\">Other Information</h4>";
            if (response2.habitat) {
                var pokeHabitat = response2.habitat.name;
                pokeHabitat = capFirst(pokeHabitat);
                html += "<li>Habitat: " + pokeHabitat + "</li>";
            }
            html += "<li>Height: " + pokeHeight + "</li>";
            html += "<li>Weight: " + pokeWeight + "</li>";
            html += "<li>Capture Rate: " + pokeCaptureRate + "</li>";
            html += "<li>Abilities: ";
            for (var i = 0; i < pokeAbilities.length; i++) {
                if (i == pokeAbilities.length - 1) {
                    html += pokeAbilities[i].ability.name;
                }
                else {
                    html += pokeAbilities[i].ability.name + ", ";
                }
            }
            html += "<li>Moves: ";
            for (var i = 0; i < pokeMoves.length; i++) {
                if (i == pokeMoves.length - 1) {
                    html += pokeMoves[i].move.name;
                }
                else {
                    html += pokeMoves[i].move.name + ", ";
                }
            }
            html += "</li></div></div>";
            
            $(pokeDetails).html(html);
        });
    });

function checkLanguage(flavorEntry) {
    return flavorEntry.language.name == "en";
}
function capFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
}