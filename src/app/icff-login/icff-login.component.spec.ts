/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { IcffLoginComponent } from './icff-login.component';

describe('Component: IcffLogin', () => {
  it('should create an instance', () => {
    let component = new IcffLoginComponent();
    expect(component).toBeTruthy();
  });
});
