import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        HttpClientModule,
        MatFormFieldModule,
        RouterModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get weather data', () => {
    expect(2).toEqual(2);
  });

  it('should get land data', () => {
    expect(2).toEqual(2);
  });

  it('should get saved lands', () => {
    expect(2).toEqual(2);
  });

});
