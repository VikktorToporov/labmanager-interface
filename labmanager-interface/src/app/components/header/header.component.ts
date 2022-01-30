import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('lab-name') labName = '';
  
  dropdown = false;

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('labId');
    localStorage.removeItem('labName');

    window.location.href = '/login';
  }
}
