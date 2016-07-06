import { Component, NgZone } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Tracker } from 'meteor/tracker';
import { Parties } from '../../../collections/parties.ts';
import { RouterLink }  from '@angular/router-deprecated';


@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [
    RouterLink
  ]
})
export class PartyDetails {
  private party: Party;

  constructor(params: RouteParams, ngZone: NgZone) {
    var partyId = params.get('partyId');

    Tracker.autorun(() => {
      ngZone.run(() => {
        this.party = Parties.findOne(partyId);
      });
    });
  }

  saveParty(party) {
    Parties.update(party._id, {
      $set: {
        name: party.name,
        description: party.description,
        location: party.location
      }
    });
  }
}
