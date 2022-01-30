import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDataType } from 'src/app/enums/table-data';
import { EmployeeService } from 'src/app/services/employee-service';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  isEmployee!: boolean;
  type = '';

  dataType!: TableDataType;
  data: any[] = [];


  constructor(protected route: ActivatedRoute, private examinationService: ExaminationService, private patientService: PatientService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.route.params
			.subscribe((params) => {
        if (params && params.type) {
          this.type = params.type;

          this.validateUser();
          this.generateDataType();
          this.getData();
        }
			});
  }

  validateUser() {
    if (localStorage.getItem('userType') == 'patient') {
      this.isEmployee = false;

      if (this.type == 'employees' || this.type == 'patients') {
        window.location.href = '/lab';
      }
    } else {
      this.isEmployee = true;
    }
  }

  getData() {
    switch(this.type) {
      case 'results':
        if (this.isEmployee) {
          this.getAllResults();
        } else {
          this.getPatientResults();
        }
        break;

      case 'patients':
        if (this.isEmployee) {
          this.getAllPatients();
        }
        break;

      case 'employees':
        if (this.isEmployee) {
          this.getAllEmployees();
        }
        break;
    }
  }

  getAllResults() {
    if (localStorage.getItem('userId') != null && localStorage.getItem('userId') != undefined) {
      this.examinationService.getAllEmployeeExaminations(localStorage.getItem('userId') || '')
      .subscribe((result: any[]) => {
        console.log(result);
        this.data = result;
      })
    }
  }

  getPatientResults() {
    if (localStorage.getItem('userId') != null && localStorage.getItem('userId') != undefined) {
      this.examinationService.getAllPatientExaminations(localStorage.getItem('userId') || '')
      .subscribe((result: any[]) => {
        console.log(result);
        this.data = result;
      })
    }
  }

  getAllPatients() {
    if (localStorage.getItem('labId') != null && localStorage.getItem('labId') != undefined) {
      this.patientService.getAllPatients(localStorage.getItem('labId') || '')
      .subscribe((result: any[]) => {
        console.log(result);
        this.data = result;
      })
    }
  }

  getAllEmployees() {
    if (localStorage.getItem('labId') != null && localStorage.getItem('labId') != undefined) {
      this.employeeService.getAllEmployees(localStorage.getItem('labId') || '')
      .subscribe((result: any[]) => {
        console.log(result);
        this.data = result;
      })
    }
  }

  generateDataType() {
    switch(this.type) {
      case 'results':
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewResults;
        } else {
          this.dataType = TableDataType.PatientViewResults;
        }

        break;

      case 'patients':
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewPatients;
        } else {
          this.dataType = null;
        }

        break;

      case 'employees':
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewEmployees;
        } else {
          this.dataType = null;
        }

        break;
    }
  }
}
