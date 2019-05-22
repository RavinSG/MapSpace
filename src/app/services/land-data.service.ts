import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LandDetail} from '../shared/landDetails';

@Injectable({
  providedIn: 'root'
})
export class LandDataService {

  constructor(private http: HttpClient) {
  }

  public getLandValues() {
    return this.http.get<[LandDetail]>('/python/landvalue');
  }
}
