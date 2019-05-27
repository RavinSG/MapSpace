import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import {AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {FormsModule, NgModel} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        AgmCoreModule,
        MatInputModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [MapsAPILoader, GoogleMapsAPIWrapper],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
