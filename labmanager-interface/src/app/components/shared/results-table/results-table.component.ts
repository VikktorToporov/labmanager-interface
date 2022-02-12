import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableDataType } from 'src/app/enums/table-data';
import { EmployeeService } from 'src/app/services/employee-service';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';
import { verifyGeneric, verifyText } from 'src/app/shared-methods/validations';

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
  
  localStorageUserId: string;
  constructor(protected patientService: PatientService, protected examinationService: ExaminationService, protected employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.localStorageUserId = localStorage.getItem('userId');

    this.constructColumns(this.dataType);
  }

  constructColumns(dataType: TableDataType) {
    switch(dataType) {
      case TableDataType.PatientViewResults:
        this.columns = ['Test', 'Status', 'Employee', 'Date', 'Actions'];
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
        if (data && data.id) {
          return '/Edit/Patient/' + data.id;
        }

        break;

      case TableDataType.EmployeeViewEmployees:
        if (data && data.id) {
          return '/Edit/Employee/' + data.id;
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
        if (data && data.id) {
          this.removePatient(data.id);
        }

        break;

      case TableDataType.EmployeeViewEmployees:
        if (data && data.id) {
          this.removeEmployee(data.id);
        }

        break;
    }
  }

  removeExamination(id: string) {
    if (verifyGeneric(id)) {
      this.examinationService.removeExamination(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }

  removePatient(id: string) {
    if (verifyGeneric(id)) {

      this.patientService.removePatient(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }

  removeEmployee(id: string) {
    if (verifyGeneric(id)) {
      this.employeeService.removeEmployee(id)
      .subscribe(result => {
        this.refreshResults.emit();
      });
    }
  }

  openResultInfoDialog(information: string): void {
    if (verifyText(information)) {
      this.dialog.open(ResultInfoDialog, {
        width: '250px',
        data: information,
      });
    }
  }
}

@Component({
  selector: 'result-info-dialog',
  template: `{{data}}`,
})
export class ResultInfoDialog {
  constructor(
    public dialogRef: MatDialogRef<ResultInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}