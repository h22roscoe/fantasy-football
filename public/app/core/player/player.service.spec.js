'use strict';

describe('Player', function() {
  var $httpBackend;
  var Player;
  var playersData = [{
      _id: 1,
      name: 'Player X'
    }, {
      _id: 2,
      name: 'Player Y'
    }, {
      _id: 3,
      name: 'Player Z'
    }];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Player` service before each test
  beforeEach(module('core.player'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Player_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('players/all').respond(playersData);

    Player = _Player_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the players data from `/players/all`', function() {
    var players = Player.query();

    expect(players).toEqual([]);

    $httpBackend.flush();
    expect(players).toEqual(playersData);
  });
});
