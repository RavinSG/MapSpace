import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawComponent } from './draw.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSnackBarModule
} from '@angular/material';
import {AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




describe('DrawComponent', () => {
  let component: DrawComponent;
  let fixture: ComponentFixture<DrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawComponent ],
      imports: [
        MatExpansionModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AgmCoreModule,
        RouterModule.forRoot([]),
      ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
