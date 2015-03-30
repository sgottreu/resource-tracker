var planetary_resources = {
    "k": {
        "ore": 1,
        "energy": 2,
        "settlers": 2,
        "grain": 3,
        "crystals": 4
    },
    "t": {
        "ore": 0,
        "energy": 0,
        "settlers": 0,
        "grain": 0,
        "crystals": 0       
    },
    "d": {
        "ore": 0,
        "energy": 0,
        "settlers": 0,
        "grain": 0,
        "crystals": 0
    },
    "x": {
        "ore": 0,
        "energy": 0,
        "settlers": 0,
        "grain": 0,
        "crystals": 0
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