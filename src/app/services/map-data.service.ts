import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface CordStatus {
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor(private http: HttpClient) {
  }

  sendCords(cords: any[]) {
    console.log(cords);
    return this.http.post<CordStatus>('/python/get_cords', {cords});
  }

}
