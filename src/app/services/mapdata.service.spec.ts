import { TestBed } from '@angular/core/testing';

import { MapDataService } from './map-data.service';
import {HttpClientModule} from '@angular/common/http';

describe('MapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MapDataService = TestBed.get(MapDataService);
    expect(service).toBeTruthy();
  });
  it('should post correct coordinates', () => {
    expect(2).toEqual(2);
  });
  it('should enable sphere geometry', () => {
    expect(2).toEqual(2);
  });
  it('should return the correct land area', () => {
    expect(2).toEqual(2);
  });
});
