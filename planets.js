var planets = {
  "home":["k", "t", "d", "x"],
  "xeno": ["alpha", "beta", "theta", "omega", "delta", "upsilon", "chi","gamma", "kappa", "lambda"]
}

var resources = ["ore","energy","settlers","grain","crystals"];

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

var buildSection = function(name) {
    var html = '<div class="planet">';
    html +=     '<div class="planet_label label">'+name.toUpperCase()+'</div>' ;
    for(var i=0,len=resources.length;i<len;i++) {
        html +=  '<div class="input hide">'+resources[i]+'<br>';
        html += '<input type="number" id="'+name+'_'+resources[i]+'">';
        html += '<div class="'+name+'_'+resources[i]+' plus-minus">';
        html += '<span class="glyphicons glyphicons-circle-plus"></span>';
        html += '<span class="glyphicons glyphicons-circle-minus"></span>';
        html += '</div></div>';
    }
        
    html +=  '</div>'
    return html;
}

var buildForm = function() {
    var html = '';

    for(var i=0,len=planets.home.length;i<len;i++) {
        html += buildSection(planets.home[i]);
    }
    for(var i=0,len=planets.xeno.length;i<len;i++) {
        html += buildSection(planets.xeno[i]);
    }
    return html;
}

module.exports.names = planets;
module.exports.resources = resources;
module.exports.planetary_resources = planetary_resources;

module.exports.buildForm = buildForm;