import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Area {
  area: number;
  area_p: number;
}

@Injectable({
  providedIn: 'root'
})


export class MapDataService {

  constructor(private http: HttpClient) {
  }

  sendCords(cords, sphere, unit) {
    return this.http.post<Area>('/python/get_cords', {
      cords,
      sphere,
      unit
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

  landValue(city: string) {
    return this.http.post<number>('/python/getLandValue', {
      city
    });
  }

  reset() {
    return this.http.post('/python/reset', {});
  }
}
