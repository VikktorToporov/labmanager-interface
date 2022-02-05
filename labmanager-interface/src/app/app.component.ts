import { Component, OnInit } from '@angular/core';
import { UserType } from './enums/user-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  labName: string = '';
  username: string = '';
  userId: string = '';
  userType: UserType;

  logged = false;

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
      this.logged = true;
    }
    
    if (localStorage.getItem('labName')) {
      this.labName += localStorage.getItem('labName');
    }
    
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
    }

    if (localStorage.getItem('userType')) {
      if (localStorage.getItem('userType') === UserType[UserType.Employee]) {
        this.userType = UserType.Employee;
      } else if (localStorage.getItem('userType') === UserType[UserType.Patient]) {
        this.userType = UserType.Patient;
      }
    }
  }
}
