'use strict';

angular
  .module('fantasyFootball')
  .constant('POINTS', {
    'GK': {
      'APPEARANCE': 2,
      'SUB': 1,
      'GOAL': 10,
      'ASSIST': 6,
      'CLEANSHEET': 6,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'DEF': {
      'APPEARANCE': 2,
      'SUB': 1,
      'GOAL': 7,
      'ASSIST': 4,
      'CLEANSHEET': 6,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'MID': {
      'APPEARANCE': 2,
      'SUB': 1,
      'GOAL': 6,
      'ASSIST': 3,
      'CLEANSHEET': 2,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    },
    'ATT': {
      'APPEARANCE': 2,
      'SUB': 1,
      'GOAL': 5,
      'ASSIST': 3,
      'CLEANSHEET': 0,
      'MOTM': 8,
      'OWNGOAL': -5,
      'YELLOW': -5,
      'RED': -10
    }
  });
