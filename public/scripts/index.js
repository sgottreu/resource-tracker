var home_planets, xeno_planets, resources, planetary_resources;

function addPlanetaryResources(planets, home){
  var r_len=resources.length, p_len = planets.length;
  var doc, key, total, resource_total = 0;
  var home = (home === undefined) ? false : true;

  for(var i=0;i<p_len;i++) {
    for(var j=0;j<r_len;j++) {
      key = planets[i]+'_'+resources[j];
      doc = document.getElementById(key);

      total = (doc.value == "") ? 0 : parseInt(doc.value);

      resource_total = (home) ? parseInt(planetary_resources[ planets[i] ][ resources[j] ]) : 0;

      total = parseInt(total) + resource_total;

      doc.value = total;
    }
  }
}

var els = document.getElementsByClassName('glyphicons');

for(var i=0,len=els.length;i<len;i++){
    els[i].addEventListener("click", function(){
        var btnAction, parentId;
        btnAction = getButtonAction(this.className);
        parentId = getParentId(this.parentNode.className);
        changeResourceValue(parentId,btnAction)
    }, false);
}

var e = document.getElementsByClassName('planet_label');

for(var i=0,len=e.length;i<len;i++){
    e[i].addEventListener("click", function(){
      checkView(this.parentNode);
    }, false);
}

function getButtonAction(el){
    var classList = el.split(' ');
    var action = classList[1].split('-');
    return action[2];
}

function getParentId(el){
    classList = el.split(' ');
    return classList[0];
}

function checkView(el) {

  var classList;
  for(var h=0;h<el.children.length;h++) {
    classList = el.children[h].className.split(' ');
    if(classList[0] == 'input') {
      
        if(classList[1] == 'hide') {
          show(el.children[h]);
        } else {
          hide(el.children[h]);
        }
    }
  }
}

function show(el){

  var classList = el.className.split(' ');

  for(var i=0;i<classList.length;i++){
    if(classList[i] == 'hide') {
      classList.splice(i, 1);
    }
  }

  el.className = classList.join(' ');

}

function hide(el){
  el.className = el.className + ' hide';
}

function changeResourceValue(id,dir)
{
  var doc = document.getElementById(id);

  var total = (doc.value == "") ? 0 : parseInt(doc.value);

  switch (dir) {
    case 'minus':
      total = (total == 0) ? 0 : total - 1;
      break;
    default:
      total++;
      break;
  }
  doc.value = total;
}

document.getElementById('trade_button').addEventListener("click", function(){
  var giver = document.getElementById('trade_giver').value;
  var receiver = document.getElementById('trade_receiver').value;
  var resource = document.getElementById('trade_resources').value;
  var amount = document.getElementById('trade_amount').value;
    
  tradeResources(giver,receiver,resource, amount);
}, false);

function tradeResources(giver,receiver,resource, amount)
{
  var g_doc = document.getElementById(giver+'_'+resource);
  var r_doc = document.getElementById(receiver+'_'+resource);

  g_doc.value = parseInt(g_doc.value) - parseInt(amount);
  r_doc.value = parseInt(r_doc.value) + parseInt(amount);
}

get('/getPlanets').then(function(response) {
  setPlanets(JSON.parse(response));
}).then(function(response) {
  get('/getResources').then(function(response) {
    resources = JSON.parse(response);
  }).then(function(response) {
    get('/getPlanetResources').then(function(response) {
      planetary_resources = JSON.parse(response);
      addPlanetaryResources(home_planets, true);
      addPlanetaryResources(xeno_planets);
    })
  });
});

function setPlanets(response) {
  home_planets = response.home;
  xeno_planets = response.xeno;
}

function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
