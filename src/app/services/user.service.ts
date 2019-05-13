import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface LoginData {
  message: string;
  success: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<LoginData>('/python/database');
  }

  dailyForecast() {
    return this.http
      .get('http://api.openweathermap.org/data/2.5/forecast?id=1224085&units=metric&appid=3fba68524ee0dbea7b27dc90103d933b')
      .pipe();
  }

}
