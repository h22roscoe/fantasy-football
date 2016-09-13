'use strict';

angular
  .module('fantasyFootball')
  .constant('POINTS', {
    'GK': {
      'APPEARANCE': 2,
      'GOAL': 10,
      'ASSIST': 6,
      'CLEANSHEET': 8,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'DEF': {
      'APPEARANCE': 2,
      'GOAL': 8,
      'ASSIST': 4,
      'CLEANSHEET': 8,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'MID': {
      'APPEARANCE': 2,
      'GOAL': 5,
      'ASSIST': 3,
      'CLEANSHEET': 0,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'ATT': {
      'APPEARANCE': 2,
      'GOAL': 4,
      'ASSIST': 3,
      'CLEANSHEET': 0,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    }
  });
