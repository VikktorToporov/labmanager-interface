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
        this.columns = ['Test', 'Status', 'Employee', 'Date'];
        break;

      case TableDataType.EmployeeViewResults:
        this.columns = ['Patient ID', 'Patient', 'Test', 'Status', 'Employee', 'Date'];
        break;

      case TableDataType.EmployeeViewPatients:
        this.columns = ['Patient ID', 'Patient', 'Email'];
        break;

      case TableDataType.EmployeeViewEmployees:
        this.columns = ['Employee ID', 'Employee', 'Email'];
        break;
    }
  }
}
