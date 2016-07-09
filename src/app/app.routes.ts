import { provideRouter, RouterConfig } from '@angular/router';
import { IcffLoginComponent } from './icff-login/';
import { IcffSignupComponent } from './icff-signup/';

export const routes: RouterConfig = [
  { path: 'login', component: IcffLoginComponent },
  { path: 'signup', component: IcffSignupComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
