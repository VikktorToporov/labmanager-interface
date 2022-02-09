import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDataType } from 'src/app/enums/table-data';
import { EmployeeService } from 'src/app/services/employee-service';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() dataType!: TableDataType;

  @Output('refresh-results') refreshResults: EventEmitter<any> = new EventEmitter();

  columns: string[] = [];
  enumTableDataType = TableDataType;
  
  constructor(protected patientService: PatientService, protected examinationService: ExaminationService, protected employeeService: EmployeeService) { }

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

  getEditPage(data: any): string {
    switch(this.dataType) {
      case TableDataType.EmployeeViewResults:
        if (data && data.examinationId) {
          return '/Edit/Examination/' + data.examinationId;
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

  remove(data: any) {
    this.refreshResults.emit();

    switch(this.dataType) {
      case TableDataType.EmployeeViewResults:
        if (data && data.examinationId) {
          this.removeExamination(data.examinationId);
        }

        break;

      case TableDataType.EmployeeViewPatients:
        if (data && data.patientId) {
          this.removePatient(data.patientId);
        }

        break;

      case TableDataType.EmployeeViewEmployees:
        if (data && data.employeeId) {
          this.removeEmployee(data.employeeId);
        }

        break;
    }
  }

  removeExamination(id: string) {
    if (id != null && id != undefined) {
      this.examinationService.removeExamination(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }

  removePatient(id: string) {
    if (id != null && id != undefined && id.length > 0) {
      this.patientService.removePatient(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }

  removeEmployee(id: string) {
    if (id != null && id != undefined && id.length > 0) {
      this.employeeService.removeEmployee(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }
}
