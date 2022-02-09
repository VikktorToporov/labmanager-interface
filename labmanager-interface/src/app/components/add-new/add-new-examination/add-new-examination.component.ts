import { Component, OnInit } from '@angular/core';
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
      laboratory_id: [this.localStorageLabId],
    });

    this.getPatients();
    this.getExaminationTypes();
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
}
