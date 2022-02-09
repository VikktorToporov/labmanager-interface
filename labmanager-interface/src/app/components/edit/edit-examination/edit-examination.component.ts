import { Component, OnInit } from '@angular/core';
import { BaseExaminationComponent } from '../../shared/base-examination/base-examination.component';

@Component({
  selector: 'app-edit-examination',
  templateUrl: './edit-examination.component.html',
  styleUrls: ['./edit-examination.component.scss']
})
export class EditExaminationComponent extends BaseExaminationComponent implements OnInit {
  examinationId: string;
  examinationDetails: any;
  
  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      if(params && params.id) {
        this.examinationId = params.id;

        this.examinationService.getExaminationDetails(this.examinationId)
          .subscribe((result: any)=> {
            this.examinationDetails = result;

            this.initForm();
          });
      }
    });
  }

  initForm() {
    this.examinationForm = this._formBuilder.group({
      patient_id: [this.examinationDetails.patient_id],
      examinationType_id: [this.examinationDetails.examinationType_id],
      information: [this.examinationDetails.information],
      completed: [this.examinationDetails.completed],
      madeOnDate: [this.examinationDetails.madeOnDate],
      employee_id: [this.examinationDetails.employee_id],
      laboratory_id: [this.examinationDetails.laboratory_id],
    });
  }

  save() {
    if (this.examinationForm.valid) {
      const madeOnDate = this.convertDate();
      const patient_id = this.examinationForm.value.patient_id;
      const examinationType_id = this.examinationForm.value.examinationType_id;
      const information = this.examinationForm.value.information;
      const completed = this.examinationForm.value.completed;
      const employee_id = this.examinationForm.value.employee_id;
      const laboratory_id = this.examinationForm.value.laboratory_id;

      const examination = {
        madeOnDate: madeOnDate,
        patient_id: patient_id,
        information: information,
        completed: completed,
        employee_id: employee_id,
        examinationType_id: examinationType_id,
        laboratory_id: laboratory_id,
      };

      this.examinationService.updateExamination(examination)
        .subscribe((result: any)=> {
          if (result) {
            window.location.href = '/Get/Results';
          }
        });
    } else {
      console.log('Invalid Form!');
    }
  }

  remove() {
    this.examinationService.removeExamination(this.examinationId)
      .subscribe((result: any)=> {
        window.location.href = '/Get/Results';
    });
  }
}
