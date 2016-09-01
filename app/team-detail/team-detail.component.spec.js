'use strict';

describe('teamDetail', function() {

  // Load the module that contains the `teamDetail` component before each test
  beforeEach(module('teamDetail'));

  // Test the controller
  describe('TeamDetailController', function() {
    var $httpBackend;
    var ctrl;
    var xyzTeamData = {
      _id: 1,
      name: 'team xyz',
      points: 60
    };

    beforeEach(inject(function(
      $componentController,
      _$httpBackend_,
      $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('teams/xyz').respond(xyzTeamData);

      $routeParams.teamId = 'xyz';

      ctrl = $componentController('teamDetail');
    }));

    it('should fetch the team details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.team).toEqual({});

      $httpBackend.flush();
      expect(ctrl.team).toEqual(xyzTeamData);
    });

  });

});
