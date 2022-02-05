import { Component, Input } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('lab-name') labName = '';
  @Input('user-id') userId = '';
  @Input('username') username = '';
  @Input('user-type') userType: UserType;

  dropdown = false;
  enumUserType = UserType;

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('labId');
    localStorage.removeItem('labName');

    window.location.href = '/Login';
  }

  addExamination() {

  }

  addEmployee() {

  }

  addPatient() {

  }
}
