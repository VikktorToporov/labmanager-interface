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
        this.columns = ['Actions','Test', 'Status', 'Employee', 'Date'];
        break;

      case TableDataType.EmployeeViewResults:
        this.columns = ['Actions', 'Patient ID', 'Patient', 'Test', 'Status', 'Employee', 'Date'];
        break;

      case TableDataType.EmployeeViewPatients:
        this.columns = ['Actions','Patient ID', 'Patient', 'Email'];
        break;

      case TableDataType.EmployeeViewEmployees:
        this.columns = ['Actions','Employee ID', 'Employee', 'Email'];
        break;
    }
  }

  edit(data: any) {
    const page = this.getEditPage(data);
    console.log(page)
    if (page && page.length > 0) {
      console.log(page)
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

        return '';
      case TableDataType.EmployeeViewPatients:
        if (data && data.patientId) {
          return '/Edit/Patient/' + data.patientId;
        }
        
        return ''

      case TableDataType.EmployeeViewEmployees:
        if (data && data.employeeId) {
          return '/Edit/Employee/' + data.employeeId;
        }

        return ''
      
      default:
        return '';
    }
  }
}
