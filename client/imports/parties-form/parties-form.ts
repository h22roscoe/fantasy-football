import 'reflect-metadata';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Parties } from '../../../collections/parties.ts'

@Component({
  selector: 'parties-form',
  templateUrl: '/client/imports/parties-form/parties-form.html'
})
@InjectUser('user')
export class PartiesForm extends MeteorComponent {
  private user: Meteor.User;
  private partiesForm: ControlGroup;

  constructor() {
    super();

    let fb = new FormBuilder();

    this.partiesForm = fb.group({
      name: new Control('', Validators.required),
      description: new Control(''),
      location: new Control('', Validators.required)
    });

    console.log(this.user);
  }

  addParty(party) {
    if (this.partiesForm.valid) {
      if (Meteor.userId()) {
        Parties.insert({
          name: party.name,
          description: party.description,
          location: party.location,
          owner: Meteor.userId()
        });

        (<Control>this.partiesForm.controls['name']).updateValue('');
        (<Control>this.partiesForm.controls['description']).updateValue('');
        (<Control>this.partiesForm.controls['location']).updateValue('');
      } else {
        alert('Please log in to add a party');
      }
    }
  }
}
