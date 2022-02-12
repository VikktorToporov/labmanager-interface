import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDataType } from 'src/app/enums/table-data';
import { TableType } from 'src/app/enums/table-type';
import { UserType } from 'src/app/enums/user-type';
import { EmployeeService } from 'src/app/services/employee-service';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';
import { verifyGeneric } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  isEmployee!: boolean;
  tableType: string;
  tableTitle: string;
  userId: string = null;

  dataType!: TableDataType;
  data: any[] = [];

  localStorageUserId: string;
  localStorageUserType: UserType;
  localStorageLabId: string;

  noData = false;

  constructor(protected route: ActivatedRoute, private examinationService: ExaminationService, private patientService: PatientService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.route.params
			.subscribe((params) => {
        if (params && params.id) {
            this.tableType = 'MyResults';
            this.tableTitle = 'My Results';
            this.userId = params.id;

            this.init();
          } else {
            this.tableType = 'AllResults';
            this.tableTitle = 'All Results';

            this.init();
          }
			});
  }

  init() {
    this.noData = true;
    this.getLocalStorageData();
    this.validateUser();
    this.generateDataType();

    if (this.tableType === TableType[TableType.MyResults]) {
      this.getMyResults();
    } else if (this.tableType === TableType[TableType.AllResults]) {
      this.getAllResults();
    }
  }

  getLocalStorageData() {
    this.localStorageUserId = localStorage.getItem('userId')
    this.localStorageLabId = localStorage.getItem('labId');

    if (localStorage.getItem('userType') === UserType[UserType.Employee]) {
      this.localStorageUserType = UserType.Employee;
    } else if (localStorage.getItem('userType') === UserType[UserType.Patient]) {
      this.localStorageUserType = UserType.Patient;
    }
  }

  validateUser() {
    if (this.localStorageUserType === UserType.Patient) {
      this.isEmployee = false;

      if (this.tableType == TableType[TableType.AllResults]) {
        this.redirectToLab();
      }
    } else {
      this.isEmployee = true;
    }
  }

  generateDataType() {
    switch(this.tableType) {
      case TableType[TableType.MyResults]:
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewResults;
        } else {
          this.dataType = TableDataType.PatientViewResults;
        }

        break;

      case TableType[TableType.AllResults]:
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewResults;
        } else {
          this.dataType = null;
        }

        break;
    }
  }

  getMyResults() {
    if (this.isEmployee && this.userId && this.userId != this.localStorageUserId) {
      this.tableTitle = 'Patient Results';
      this.getPatientResults(this.userId);
    } else if ((!this.isEmployee && this.userId === this.localStorageUserId)) {
      this.getPatientResults(this.userId);
    } else if (this.isEmployee && this.userId === this.localStorageUserId) {
      this.getPatientResultsByEmployee(this.userId);
    } else {
      this.redirectToLab();
    }
  }

  getAllResults() {
    if (verifyGeneric(this.localStorageLabId)) {
      this.examinationService.getAllResults(this.localStorageLabId || '')
      .subscribe((result: any[]) => {
        if (result.length) {
          this.noData = false;
          this.data = result;
        } else {
          this.noData = true;
        }
      }, error => this.redirectToLab());
    }
  }

  getPatientResults(patientId: string) {
    if (verifyGeneric(patientId)) {
      this.examinationService.getAllPatientExaminations(patientId || '')
      .subscribe((result: any[]) => {
        if (result.length) {
          this.noData = false;
          this.data = result;
        } else {
          this.noData = true;
        }
      }, error => this.redirectToLab());
    }
  }

  getPatientResultsByEmployee(employeeId: string) {
    if (verifyGeneric(employeeId)) {
      this.examinationService.getAllPatientExaminationsByEmployee(employeeId || '')
      .subscribe((result: any[]) => {
        if (result.length) {
          this.noData = false;
          this.data = result;
        } else {
          this.noData = true;
        }
      }, error => this.redirectToLab());
    }
  }

  refreshResults() {
    window.scroll(0,0);
    this.init();
  }

  redirectToLab() {
    window.location.href = '/Lab';
  }
}
