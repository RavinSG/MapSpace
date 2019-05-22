import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


export interface Logout {
  message: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    let logged_out: string;
    this.http.post<Logout>('/python/logout', {})
      .subscribe(data => {
        console.log(data);
        logged_out = data.message;
        console.log(logged_out);
        if (logged_out === 'logout') {
          this.auth.loggedInStatus = false;
          this.router.navigate(['/home']);
        }
      });


  }

}
