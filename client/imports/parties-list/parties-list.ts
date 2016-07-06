import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { RouterLink }  from '@angular/router-deprecated';
import { LoginButtons } from 'angular2-meteor-accounts-ui';

import { Parties }     from '../../../collections/parties';
import { PartiesForm } from '../parties-form/parties-form';

@Component({
  selector: 'parties-list',
  templateUrl: '/client/imports/parties-list/parties-list.html',
  directives: [
    PartiesForm,
    RouterLink,
    LoginButtons
  ]
})
export class PartiesList {
  private parties: Mongo.Cursor;

  constructor() {
    this.parties = Parties.find();
  }

  removeParty(party) {
    Parties.remove(party._id);
  }
}
