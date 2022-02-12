import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDataType } from 'src/app/enums/table-data';
import { UserType } from 'src/app/enums/user-type';
import { EmployeeService } from 'src/app/services/employee-service';
import { verifyGeneric } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isEmployee!: boolean;

  dataType!: TableDataType;
  data: any[] = [];

  localStorageUserType: UserType;
  localStorageLabId: string;

  constructor(protected route: ActivatedRoute, private employeesService: EmployeeService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getLocalStorageData();
    this.validateUser();
    this.generateDataType();
    this.getData();
  }

  getLocalStorageData() {
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

      window.location.href = '/Lab';
    } else {
      this.isEmployee = true;
    }
  }

  generateDataType() {
    if (this.isEmployee) {
      this.dataType = TableDataType.EmployeeViewEmployees;
    } else {
      this.dataType = null;
    }
  }

  getData() {
    if (this.isEmployee) {
      this.getAllEmployees();
    }
  }

  getAllEmployees() {
    if (verifyGeneric(this.localStorageLabId)) {
      this.employeesService.getAllEmployees(this.localStorageLabId || '')
      .subscribe((result: any[]) => {
        this.data = result;
      })
    }
  }

  refreshResults() {
    window.scroll(0,0);
    this.getData();
  }
}
