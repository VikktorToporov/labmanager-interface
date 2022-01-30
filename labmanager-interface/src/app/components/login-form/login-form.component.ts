import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor(private userService: UserService) {};

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      window.location.href = '/lab';
    }
  }

  login(name: string, pass: string) {
    // call api and get user id, lab id, user type
    const labId = '1';
    const userId = '1';
    const userType = 'employee';
    const labName = 'A Lab Name';

    localStorage.setItem('userId', userId);
    localStorage.setItem('labId', labId);
    localStorage.setItem('labName', labName)
    localStorage.setItem('userType', userType);

    this.userService.getLab(labId).subscribe(result => {
        window.location.href = '/lab';
      });
  }
}
