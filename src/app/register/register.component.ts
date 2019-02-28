import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  registerUser(event) {
    event.preventDefault();
    const errors = [];
    const target = event.target;
    const username = target.querySelector('#username').value();
    const password = target.querySelector('#password').value();
    const cpassword = target.querySelector('#cpassword').value();

    if (password !== cpassword) {
      errors.push('Passwords do not match');
    }

    if (errors.length > 0){

    }
  }

}
