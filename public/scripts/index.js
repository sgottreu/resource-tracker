var planetary_resources = {
    "k": {
        "ore": 5,
        "energy": 2,
        "settlers": 1,
        "grain": 0,
        "crystals": 2
    },
    "t": {
        "ore": 2,
        "energy": 0,
        "settlers": 2,
        "grain": 4,
        "crystals": 1      
    },
    "d": {
        "ore": 3,
        "energy": 3,
        "settlers": 0,
        "grain": 0,
        "crystals": 4
    },
    "x": {
        "ore": 1,
        "energy": 0,
        "settlers": 4,
        "grain": 3,
        "crystals": 1	
    }
};

var planets = Object.keys(planetary_resources);

var resources = Object.keys(planetary_resources.k);


var doc, key, total;
var r_len=resources.length, p_len = planets.length;

addPlanetaryResources();

function addPlanetaryResources(){

    for(var i=0;i<p_len;i++) {
        for(var j=0;j<r_len;j++) {
            key = planets[i]+'_'+resources[j];
            doc = document.getElementById(key);

            total = (doc.value == "") ? 0 : parseInt(doc.value);

            total = parseInt(total) + parseInt(planetary_resources[ planets[i] ][ resources[j] ]);

            doc.value = total;
        }
    }
}