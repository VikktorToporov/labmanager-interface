import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDataType } from 'src/app/enums/table-data';
import { TableType } from 'src/app/enums/table-type';
import { UserType } from 'src/app/enums/user-type';
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
  tableType: string;
  tableTitle: string;
  userId: string = null;

  dataType!: TableDataType;
  data: any[] = [];

  localStorageUserId: string;
  localStorageUserType: UserType;
  localStorageLabId: string;

  constructor(protected route: ActivatedRoute, private examinationService: ExaminationService, private patientService: PatientService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.route.params
			.subscribe((params) => {
        if (params) {
          if (params.type) {
            this.tableType = params.type;

            this.init();
          } else if (params.id) {
            this.tableType = 'Results';
            this.tableTitle = 'My Results';
            this.userId = params.id;

            this.init();
          }
        }
			});
  }

  init() {
    this.getLocalStorageData();
    this.validateUser();
    this.generateDataType();
    this.getData();
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

      if (this.tableType == TableType[TableType.Employees] || this.tableType == TableType[TableType.Patients]) {
        window.location.href = '/Lab';
      }
    } else {
      this.isEmployee = true;
    }
  }

  generateDataType() {
    switch(this.tableType) {
      case TableType[TableType.Results]:
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewResults;
        } else {
          this.dataType = TableDataType.PatientViewResults;
        }

        break;

      case TableType[TableType.Patients]:
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewPatients;
        } else {
          this.dataType = null;
        }

        break;

      case TableType[TableType.Employees]:
        if (this.isEmployee) {
          this.dataType = TableDataType.EmployeeViewEmployees;
        } else {
          this.dataType = null;
        }

        break;
    }
  }

  getData() {
    switch(this.tableType) {
      case TableType[TableType.Results]:
        if (this.isEmployee) {
          if (this.userId) {
            if (this.userId === this.localStorageUserId) {
              this.getPatientResultsByEmployee(this.userId);
            } else {
              this.getPatientResults(this.userId);
            }
          } else {
            this.getAllResults();
          }
        } else {
          this.getPatientResults(this.localStorageUserId);
        }
        break;

      case TableType[TableType.Patients]:
        if (this.isEmployee) {
          this.getAllPatients();
        }
        break;

      case TableType[TableType.Employees]:
        if (this.isEmployee) {
          this.getAllEmployees();
        }
        break;
    }
  }

  getAllResults() {
    if (this.localStorageLabId != null && this.localStorageLabId != undefined) {
      this.examinationService.getAllResults(this.localStorageLabId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  getPatientResults(patientId: string) {
    if (patientId != null && patientId != undefined) {
      this.examinationService.getAllPatientExaminations(patientId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  getPatientResultsByEmployee(employeeId: string) {
    if (employeeId != null && employeeId != undefined) {
      this.examinationService.getAllPatientExaminationsByEmployee(employeeId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  getAllPatients() {
    if (this.localStorageLabId != null && this.localStorageLabId != undefined) {
      this.patientService.getAllPatients(this.localStorageLabId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  getAllEmployees() {
    if (this.localStorageLabId != null && this.localStorageLabId != undefined) {
      this.employeeService.getAllEmployees(this.localStorageLabId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  refreshResults() {
    this.getData();
  }
}
