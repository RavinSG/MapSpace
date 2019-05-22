import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


interface RegisterResponse {
  success: boolean;
}

interface LoginData {
  success: boolean;
  message: string;
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedInStatus;

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    this.http.post<LoginData>('/python/login', {})
      .subscribe(data => {
          this.loggedInStatus = data.success;
          console.log(data);
        }
      )
    ;
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    return this.http.post<LoginData>('/python/login', {
      username,
      password
    });
  }

  registerUser(username, password) {
    return this.http.post<RegisterResponse>('/node/register', {
      username,
      password
    }, httpOptions);
  }

  setLoggedIn(login: boolean) {
    this.loggedInStatus = login;
    localStorage.setItem('loggedIn', 'true');
  }

}
