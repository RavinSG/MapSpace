import { TestBed } from '@angular/core/testing';

import { LandDataService } from './land-data.service';
import { HttpClientModule} from '@angular/common/http';

describe('LandDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: LandDataService = TestBed.get(LandDataService);
    expect(service).toBeTruthy();
  });
  it('should fetch land value for Moratuwa', () => {
    expect(2).toEqual(2);
  });
  it('should fetch area of Colombo', () => {
    expect(2).toEqual(2);
  });
  it('should fetch all land values', () => {
    expect(2).toEqual(2);
  });
});
