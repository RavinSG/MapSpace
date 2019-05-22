import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor(private http: HttpClient) {
  }

  sendCords(cords, sphere) {
    return this.http.post<number>('/python/get_cords', {
      cords,
      sphere
    });
  }

}
