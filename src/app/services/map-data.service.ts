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

  convertUnits(from_unit: string, to_unit: string, area: number) {
    return this.http.post<number>('/python/convert', {
      from_unit,
      to_unit,
      area
    });
  }

  saveArea(area: number, coordinates: object, center: object, unitType: string) {
    return this.http.post<string>('/python/saveArea', {
      area,
      coordinates,
      center,
      unitType
    });
  }

}
