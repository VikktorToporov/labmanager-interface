import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDataType } from 'src/app/enums/table-data';
import { EmployeeViewEmployees, EmployeeViewPatients, EmployeeViewResults, PatientViewResults } from 'src/app/models/table-data';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  isEmployee!: boolean;
  type = '';

  dataType: TableDataType = TableDataType.PatientViewResults;
  dataType2: TableDataType = TableDataType.EmployeeViewResults;
  dataType3: TableDataType = TableDataType.EmployeeViewPatients;
  dataType4: TableDataType = TableDataType.EmployeeViewEmployees;

  data: PatientViewResults[] = [
    {
      test: 'Some Test',
      status: 'Done',
      date: '28.01.2022',
      employee: 'Kristiyan Stanchev',
    },
    {
      test: 'Some Test',
      status: 'Done',
      date: '28.01.2022',
      employee: 'Kristiyan Stanchev',
    },
  ];

  data2: EmployeeViewResults[] = [
    {
      patient: 'Viktor Toporov',
      patientId: '95909',
      test: 'Some Test',
      status: 'Done',
      date: '28.01.2022',
      employee: 'Kristiyan Stanchev',
    },
    {
      patient: 'Viktor Toporov',
      patientId: '95909',
      test: 'Some Test',
      status: 'Done',
      date: '28.01.2022',
      employee: 'Kristiyan Stanchev',
    },
  ];

  data3: EmployeeViewPatients[] = [
    {
      patient: 'Viktor Toporov',
      patientId: '95909',
      email: 'useremail@gmail.com',
    },
    {
      patient: 'Viktor Toporov',
      patientId: '95909',
      email: 'useremail@gmail.com',
    },
  ];

   data4: EmployeeViewEmployees[] = [
    {
      employee: 'Kristiyan Stanchev',
      employeeId: '95908',
      email: 'useremail@gmail.com',
    },
    {
      employee: 'Kristiyan Stanchev',
      employeeId: '95908',
      email: 'useremail@gmail.com',
    },
  ];

  constructor(protected route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
			.subscribe((params) => {
        if (params && params.type) {
          this.type = params.type;

          this.validateUser();
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
}
