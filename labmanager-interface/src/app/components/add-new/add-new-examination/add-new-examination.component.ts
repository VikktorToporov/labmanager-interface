import { Component, OnInit } from '@angular/core';
import { verifyGeneric, verifyText } from 'src/app/shared-methods/validations';
import { BaseExaminationComponent } from '../../shared/base-examination/base-examination.component';

@Component({
  selector: 'app-add-new-examination',
  templateUrl: './add-new-examination.component.html',
  styleUrls: ['./add-new-examination.component.scss']
})
export class AddNewExaminationComponent extends BaseExaminationComponent implements OnInit {
  ngOnInit() {
    this.localStorageLabId = localStorage.getItem('labId');

    this.examinationForm = this._formBuilder.group({
      patient_id: [null],
      examinationType_id: [null],
      information: [''],
      completed: [null],
      madeOnDate: [''],
      employee_id: [localStorage.getItem('userId')],
    });

    this.getPatients();
    this.getExaminationTypes();
  }

  save() {
    if (this.examinationForm.valid) {
      const date = this.convertDate(this.examinationForm.value.madeOnDate);
      const patient_id = this.examinationForm.value.patient_id;
      const examinationType_id = this.examinationForm.value.examinationType_id;
      const information = this.examinationForm.value.information;
      const completed = this.examinationForm.value.completed;
      const employee_id = this.examinationForm.value.employee_id;

      if (verifyGeneric(date) && verifyGeneric(patient_id) && verifyGeneric(examinationType_id) && verifyText(information) && verifyGeneric(completed) && verifyGeneric(employee_id)) {
        const examination = {
          madeOnDate: date,
          information: information,
          completed: completed,
        };
  
        this.examinationService.addExamination(examination, patient_id, employee_id, examinationType_id)
          .subscribe((result: any)=> {
            if (result) {
              window.location.href = '/Get/Results/All';
            }
        });
      } else {
        console.log('Data failed verification!');
      }
    } else {
      console.log('Invalid Form!');
    }
  }
}
