import { Component } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent {
  isEmployee = false;

  publicLinks = [
    {
      title: 'Results',
      icon: '../../../assets/check-list.png',
      link: '/Get/Results',
      text: null,
    },
    {
      title: 'Services',
      icon: '../../../assets/check-list.png',
      link: '/Services',
      text: null,
    },
  ];

  privateLinks = [
    {
      title: 'Employees',
      icon: '../../../assets/check-list.png',
      link: '/Get/Employees',
      text: null,
    },
    {
      title: 'Patients',
      icon: '../../../assets/check-list.png',
      link: '/Get/Patients',
      text: null,
    }
  ];

  constructor() {
    const userType = localStorage.getItem('userType');

    if (userType == UserType[UserType.Employee]) {
      this.isEmployee = true;
    }
  };
}
