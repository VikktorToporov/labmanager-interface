import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination-service';

@Component({
  selector: 'app-add-new-examination',
  templateUrl: './add-new-examination.component.html',
  styleUrls: ['./add-new-examination.component.scss']
})
export class AddNewExaminationComponent implements OnInit {
  isLinear = false;
  examinationForm: FormGroup;

  patients = [
    {id: '1', name: 'Patient1'},
    {id: '2', name: 'Patient2'},
    {id: '3', name: 'Patient3'},
  ];

  examinationTypes = [
    {id: '1', name: 'ExamType1'},
    {id: '2', name: 'ExamType2'},
    {id: '3', name: 'ExamType3'},
  ];

  statuses = [
    {id: true, name: 'Done'},
    {id: false, name: 'In Progress'},
  ];
  
  constructor(private _formBuilder: FormBuilder, private examinationService: ExaminationService) {}

  ngOnInit() {
    this.examinationForm = this._formBuilder.group({
      patient_id: [null],
      examinationType_id: [null],
      information: [''],
      completed: [null],
      madeOnDate: [''],
      employee_id: [localStorage.getItem('userId')],
      laboratory_id: [localStorage.getItem('labId')],
    });
  }

  save() {
    if (this.examinationForm.valid) {
      const date = this.convertDate();
      const patient_id = this.examinationForm.value.patient_id;
      const examinationType_id = this.examinationForm.value.examinationType_id;
      const information = this.examinationForm.value.information;
      const completed = this.examinationForm.value.completed;
      const employee_id = this.examinationForm.value.employee_id;
      const laboratory_id = this.examinationForm.value.laboratory_id;

      const examination = {
        madeOnDate: date,
        patient_id: patient_id,
        information: information,
        completed: completed,
        employee_id: employee_id,
        examinationType_id: examinationType_id,
        laboratory_id: laboratory_id,
      };

      this.examinationService.addExamination(examination)
      .subscribe((result: any)=> {
        if (result && result.id) {
          this.examinationService.addExaminationToLab(laboratory_id, result.id)
              .subscribe((result: any)=> {
                if (result) {
                  window.location.href = '/Get/Results';
                }
              });
        }
      });
    } else {
      console.log('Invalid Form!');
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
