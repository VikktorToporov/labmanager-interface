import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';
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
      window.location.href = '/Lab';
    }
  }

  login(email: string, pass: string) {
    // call api and get user id, lab id, user type
    const labId = '1';
    const userId = '2';
    const username = 'VikkToporov';
    const userType = UserType[UserType.Employee];
    const labName = 'A Lab Name';

    // localStorage.setItem('userId', userId);
    // localStorage.setItem('username', username);
    // localStorage.setItem('labId', labId);
    // localStorage.setItem('labName', labName)
    // localStorage.setItem('userType', userType);

    const verified = this.verifyData(email, pass);

    if (verified) {
      const user = {
        email: email,
        password: pass,
      };
  
      this.userService.login(user)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('userId', result.id);
            localStorage.setItem('username', result.username);
            localStorage.setItem('labId', result.laboratoryId);
            localStorage.setItem('labName', result.laboratoryName)
            localStorage.setItem('userType', result.dtype);
  
            window.location.href = '/Lab';
          }
        });
    } else {
      console.log('Invalid data');
    }
    
  }

  verifyData(email: string, pass: string): boolean {
    if (this.verifyEmail(email) && this.verifyPass(pass)) {
      return true
    }

    return false;
  }

  verifyEmail(email: string): boolean {
    if (email != null && email != undefined && email.length > 5 && email.length < 100) {
      return true;
    }

    return false;
  }

  verifyPass(pass: string): boolean {
    if (pass != null && pass != undefined && pass.length > 5 && pass.length < 100) {
      return true;
    }

    return false;
  }

  signup() {
    this.userService.signup()
        .subscribe((result: any) => {

        });
  }
}
