function formationChosen(formation) {
  if (formation) {
    parseFormation(formation);
  }
}

function parseFormation(formation) {
  var myRegexp = /(\d)-(\d)-(\d)/g;
  var match = myRegexp.exec(formation);

  if (match) {
    // TODO: Limit the number of choices to the respective groups
    // where match[1] is number of defenders in the formation etc.
    var defenders = parseInt(match[1]);
    var midfielders = parseInt(match[2]);
    var attackers = parseInt(match[3]);
    limitSelection(defenders, midfielders, attackers);
  }
}

function limitSelection(defenders, midfielders, attackers) {
  var maxdefs = maxdefs || 4
  var maxmids = maxmids || 5
  var maxatts = maxatts || 3

  for (var def = 1; def <= defenders; def++) {
    var lowerdef = document.getElementById("defender" + def);
    lowerdef.lastChild.firstChild.disabled = false;
  }
  while (defenders < maxdefs) { // i.e. 3 at the back
    defenders++;
    var higherdef = document.getElementById("defender" + defenders);

    // So to not submit it on completion.
    higherdef.lastChild.firstChild.disabled = true;
  }

  for (var mid = 1; mid <= midfielders; mid++) {
    var lowermid = document.getElementById("midfielder" + mid);
    lowermid.lastChild.firstChild.disabled = false;
  }
  while (midfielders < maxmids) {
    midfielders++;
    var highermid = document.getElementById("midfielder" + midfielders);

    // So to not submit it on completion.
    highermid.lastChild.firstChild.disabled = true;
  }

  for (var att = 1; att <= attackers; att++) {
    var loweratt = document.getElementById("attacker" + att);
    loweratt.lastChild.firstChild.disabled = false;
  }
  while (attackers < maxatts) {
    attackers++;
    var higheratt = document.getElementById("attacker" + attackers);

    // So to not submit it on completion.
    higheratt.lastChild.firstChild.disabled = true;
  }
}
