'use strict';

describe('teamTable', function() {

  // Load the module that contains the `teamTable` component before each test
  beforeEach(module('teamTable'));

  // Test the controller
  describe('TeamTableController', function() {
    var $httpBackend;
    var ctrl;
    var teams = [{
      name: 'Team 1',
      points: 10
    }, {
      name: 'A Team',
      points: 100
    }];

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET('teams/all')
        .respond(teams);

      ctrl = $componentController('teamTable');
    }));

    it('should create a `teams` property fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.teams).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.teams).toEqual(teams);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('points');
    });
  });
});
