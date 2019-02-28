import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    console.log(event);
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    console.log(username, password);

    this.auth.getUserDetails(username, password);
  }

}
