import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    console.log(username, password);
    this.auth.getUserDetails(username, password).subscribe(data => {
      console.log(data);
      console.log('here');
      if (data.success) {
        this.router.navigate(['/admin']);
        this.auth.setLoggedIn(true);
        console.log(this.auth.loggedInStatus);
        console.log('testing');
      } else {
        window.alert(data.message);
      }
    });
  }

}
