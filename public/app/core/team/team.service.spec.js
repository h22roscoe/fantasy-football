'use strict';

describe('Team', function() {
  var $httpBackend;
  var Team;
  var teamsData = [{
      _id: 1,
      name: 'Team X',
      points: 32
    }, {
      _id: 2,
      name: 'Team Y',
      points: 101
    }, {
      _id: 3,
      name: 'Team Z',
      points: 10
    }];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Team` service before each test
  beforeEach(module('core.team'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Team_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('teams/all').respond(teamsData);

    Team = _Team_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the teams data from `/teams/all`', function() {
    var teams = Team.query();

    expect(teams).toEqual([]);

    $httpBackend.flush();
    expect(teams).toEqual(teamsData);
  });
});
