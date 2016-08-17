$(document).ready(function() {
  setGoalkeepersOptions();
  setDefenderOptions();
  setMidfielderOptions();
  setAttackerOptions();
  setSubstituteOptions();
});

function setGoalkeepersOptions() {
  createOptions('goalkeepers', $('.gkSelect'));
}

function setDefenderOptions() {
  createOptions('defenders', $('.defSelect'));
}

function setMidfielderOptions() {
  createOptions('midfielders', $('.midSelect'));
}

function setAttackerOptions() {
  createOptions('attackers', $('.attSelect'));
}

function setSubstituteOptions() {
  createOptions('', $('.subSelect'));
}

// Calls the players api and ask for all of certain positons
// then adds the received players to the options of that selectElem.
function createOptions(positions, selectElem) {
  $.getJSON('../players/' + positions)
    .done(function(obj) {
      console.log(obj);
      $.each(obj.players, function(idx, player) {
        selectElem.append($('<option>').text(player.name));
      });
    });
}

function formationChosen(formation) {
  if (formation) {
    parseFormation(formation);
  }
}

// Makes sure that the input is in the form of a formation before limiting
// selection to fit the given formation.
function parseFormation(formation) {
  var myRegexp = /(\d)-(\d)-(\d)/g;
  var match = myRegexp.exec(formation);

  if (match) {
    var defenders = parseInt(match[1]);
    var midfielders = parseInt(match[2]);
    var attackers = parseInt(match[3]);
    limitSelection(defenders, midfielders, attackers);
  }
}

function limitSelection(defenders, midfielders, attackers) {
  var maxdefs = 4;
  var maxmids = 5;
  var maxatts = 3;

  enableUpToXThenDisable(maxdefs, defenders, 'defender');

  enableUpToXThenDisable(maxmids, midfielders, 'midfielder');

  enableUpToXThenDisable(maxatts, attackers, 'attacker');
}

// Shows and enables all elements with id + a number up to and including
// a given xth one and then disables the rest from one after x to the max.
function enableUpToXThenDisable(max, x, id) {
  for (var i = 1; i <= x; i++) {
    $('#' + id + i).show().prop('disabled', false);
  }
  while (x < max) {
    x++;
    $('#' + id + x).hide().prop('disabled', true);
  }
}
