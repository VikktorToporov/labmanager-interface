import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';
import { ExaminationService } from 'src/app/services/examination-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  publicLinks = [];
  isEmployee = false;

  constructor(private examinationService: ExaminationService) {
    const userType = localStorage.getItem('userType');

    if (userType == UserType[UserType.Employee]) {
      this.isEmployee = true;
    }
  }

  ngOnInit(): void {
    this.getAllExaminations();
  }

  getAllExaminations() {
    if (localStorage.getItem('labId') != null && localStorage.getItem('labId') != undefined) {
      this.examinationService.getAllLabExaminations(localStorage.getItem('labId') || '')
      .subscribe((result: any[]) => {
        this.publicLinks = result;
      })
    }
  }
}
