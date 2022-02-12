import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';
import { ExaminationService } from 'src/app/services/examination-service';
import { verifyGeneric } from 'src/app/shared-methods/validations';

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
    if (verifyGeneric(localStorage.getItem('labId'))) {
      this.examinationService.getAllLabExaminations(localStorage.getItem('labId') || '')
      .subscribe((result: any[]) => {
        this.publicLinks = result;
      })
    }
  }
}
