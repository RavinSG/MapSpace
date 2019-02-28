import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface RegisterResponse {
  success: boolean;
}

interface LoginData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    return this.http.post<LoginData>('/mapSpace/auth.php', {
      username,
      password
    });
  }

  registerUser(username, password) {
    return this.http.post<RegisterResponse>('http://localhost:1234/register', {
      username,
      password
    });
  }

  setLoggedIn(login: boolean) {
    this.loggedInStatus = login;
    localStorage.setItem('loggedIn', 'true');
  }

}
