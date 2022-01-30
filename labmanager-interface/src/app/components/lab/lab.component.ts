import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  isEmployee = false;

  publicLinks = [
    {
      title: 'Results',
      icon: '../../../assets/check-list.png',
      link: '/get/results',
      text: null,
    },
    {
      title: 'Services',
      icon: '../../../assets/check-list.png',
      link: '/services',
      text: null,
    },
  ];

  privateLinks = [
    {
      title: 'Employees',
      icon: '../../../assets/check-list.png',
      link: '/get/employees',
      text: null,
    },
    {
      title: 'Patients',
      icon: '../../../assets/check-list.png',
      link: '/get/patients',
      text: null,
    }
  ];

  constructor(private userService: UserService) {
    const userType = localStorage.getItem('userType');

    if (userType == 'employee') {
      this.isEmployee = true;
    }
  };

  ngOnInit(): void {

  }

}
