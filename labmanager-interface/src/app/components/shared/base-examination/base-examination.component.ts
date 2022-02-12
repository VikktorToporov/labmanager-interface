import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination-service';
import { PatientService } from 'src/app/services/patient-service';
import { verifyGeneric } from 'src/app/shared-methods/validations';

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
    {id: false, name: 'In Progress'},
    {id: true, name: 'Done'},
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
    if (verifyGeneric(this.localStorageLabId)) {
      this.patientService.getAllPatients(this.localStorageLabId || '')
        .subscribe((result: any[]) => {
          this.patients = result;
        })
    }
  }

  getExaminationTypes() {
    if (verifyGeneric(this.localStorageLabId)) {
      this.examinationService.getAllLabExaminations(this.localStorageLabId || '')
        .subscribe((result: any[]) => {
          this.examinationTypes = result;
        })
    }
  }

  convertDate(formDate: any) {
    if (formDate && formDate._i && formDate._i.date && formDate._i.month && formDate._i.year) {
      let convertedDateDay = formDate._i.date;
      let convertedDateMonth = formDate._i.month + 1;
      
      if (convertedDateDay >= 0 && convertedDateDay < 10) {
        convertedDateDay = '0' + convertedDateDay;
      }

      if (convertedDateMonth >= 0 && convertedDateMonth < 10) {
        convertedDateMonth = '0' + convertedDateMonth;
      }

      return convertedDateDay + '/' + convertedDateMonth + '/' + formDate._i.year;
    } else {
      formDate = formDate.split('-');
      formDate = formDate[2] + '/' + formDate[1] + '/' + formDate[0];
    }

    return formDate;
  }
}
