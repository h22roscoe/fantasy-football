import 'reflect-metadata';
import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import { PartiesList } from './imports/parties-list/parties-list.ts';
import { PartyDetails } from './imports/party-details/party-details.ts';

@Component({
  selector: 'app',
  templateUrl: '/client/app.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})
@RouteConfig([
  { path: '/', name: 'PartiesList', component: PartiesList },
  { path: '/party/:partyId', name: 'PartyDetails', component: PartyDetails }
])
class FantasyFootball {
}

bootstrap(FantasyFootball, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' })
]);
