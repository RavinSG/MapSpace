import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  message = 'Loading...';

  constructor(private user: UserService) {
  }

  ngOnInit() {
    this.user.getData().subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        localStorage.removeItem('loggedIn');
      }
    });
  }

}
