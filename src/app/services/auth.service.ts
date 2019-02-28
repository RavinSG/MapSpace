import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface UserData {
  success: boolean;
  message: string;
}

interface RegisterResonse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = true;

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    return this.http.post('http://localhost/mapSpace/auth.php', {
      username,
      password
    }).subscribe(data => {
      console.log(data, 'is what we got');
    });
  }

  registerUser(username, password) {
    return this.http.post<RegisterResonse>('/api/register', {
      username,
      password
    });
  }

}
