import { Component, Input, OnInit } from '@angular/core';
import { TableDataType } from 'src/app/enums/table-data';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() dataType!: TableDataType;

  columns: string[] = [];
  enumTableDataType = TableDataType;
  
  constructor() { }

  ngOnInit(): void {
    this.constructColumns(this.dataType);
  }

  constructColumns(dataType: TableDataType) {
    switch(dataType) {
      case TableDataType.PatientViewResults:
        this.columns = ['Test', 'Status', 'Employee', 'Date','Actions'];
        break;

      case TableDataType.EmployeeViewResults:
        this.columns = ['Patient ID', 'Patient', 'Test', 'Status', 'Employee', 'Date', 'Actions'];
        break;

      case TableDataType.EmployeeViewPatients:
        this.columns = ['Patient ID', 'Patient', 'Email','Actions'];
        break;

      case TableDataType.EmployeeViewEmployees:
        this.columns = ['Employee ID', 'Employee', 'Email','Actions'];
        break;
    }
  }

  edit(data: any) {
    const page = this.getEditPage(data);
    if (page && page.length > 0) {
      window.location.href = page;
    }
  }
  
  remove(data: any) {

  }

  getEditPage(data: any): string {
    switch(this.dataType) {
      case TableDataType.EmployeeViewResults:
        if (data && data.examinationId) {
          return '/Edit/Result/' + data.examinationId;
        }

        break;

      case TableDataType.EmployeeViewPatients:
        if (data && data.patientId) {
          return '/Edit/Patient/' + data.patientId;
        }

        break;

      case TableDataType.EmployeeViewEmployees:
        if (data && data.employeeId) {
          return '/Edit/Employee/' + data.employeeId;
        }

        break;
    }

    return ''
  }
}
