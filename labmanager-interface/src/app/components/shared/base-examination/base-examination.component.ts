import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';

@Component({
  selector: 'base-examination',
  template: '',
  styleUrls: []
})
export class BaseExaminationComponent implements OnInit {
  isLinear = false;
  examinationForm: FormGroup;
  localStorageLabId: string;

  patients = [];
  examinationTypes = [];

  statuses = [
    {id: 0, name: 'Done'},
    {id: 1, name: 'In Progress'},
  ];
  
  constructor(protected route: ActivatedRoute, protected _formBuilder: FormBuilder, protected patientService: PatientService, protected examinationService: ExaminationService) {}

  ngOnInit() {
    this.localStorageLabId = localStorage.getItem('labId');

    this.examinationForm = this._formBuilder.group({
      patient_id: [null],
      examinationType_id: [null],
      information: [''],
      completed: [null],
      madeOnDate: [''],
      employee_id: [localStorage.getItem('userId')],
      laboratory_id: [this.localStorageLabId],
    });

    this.getPatients();
    this.getExaminationTypes();
  }

  getPatients() {
    if (this.localStorageLabId != null && this.localStorageLabId != undefined) {
      this.patientService.getAllPatients(this.localStorageLabId || '')
        .subscribe((result: any[]) => {
          this.patients = result;
        })
    }
  }

  getExaminationTypes() {
    if (this.localStorageLabId != null && this.localStorageLabId != undefined) {
      this.examinationService.getAllLabExaminations(this.localStorageLabId || '')
        .subscribe((result: any[]) => {
          this.examinationTypes = result;
        })
    }
  }

  convertDate() {
    const formDate = this.examinationForm.value.madeOnDate;

    if (formDate && formDate._i && formDate._i.date && formDate._i.month && formDate._i.year) {
      return formDate._i.date + '/' + (formDate._i.month + 1) + '/' + formDate._i.year;
    }

    return formDate;
  }
}
