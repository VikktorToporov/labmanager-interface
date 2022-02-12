import { Component, OnInit } from '@angular/core';
import { verifyGeneric, verifyText } from 'src/app/shared-methods/validations';
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
    this.localStorageLabId = localStorage.getItem('labId');

    this.route.params
    .subscribe((params) => {
      if(params && params.id) {
        this.examinationId = params.id;

        this.examinationService.getExaminationDetails(this.examinationId)
          .subscribe((result: any)=> {
            this.examinationDetails = result;

            this.initForm();

            this.getPatients();
            this.getExaminationTypes();
          });
      }
    });
  }

  initForm() {
    this.examinationForm = this._formBuilder.group({
      id: [this.examinationId],
      information: [this.examinationDetails.information],
      completed: [this.examinationDetails.completed],
      madeOnDate: [this.examinationDetails.madeOnDate],
    });
  }

  save() {
    if (this.examinationForm.valid) {
      const madeOnDate = this.convertDate(this.examinationForm.value.madeOnDate);
      const id = this.examinationForm.value.id;
      const information = this.examinationForm.value.information;
      const completed = this.examinationForm.value.completed;

      if (verifyGeneric(madeOnDate) && verifyGeneric(id) && verifyGeneric(completed) && verifyText(information)) {
        const examination = {
          madeOnDate: madeOnDate,
          id: id,
          information: information,
          completed: completed,
        };
  
        this.examinationService.updateExamination(examination)
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

  remove() {
    if (verifyGeneric(this.examinationId)) {
      this.examinationService.removeExamination(this.examinationId)
        .subscribe((result: any)=> {
          window.location.href = '/Get/Results';
        });
    }
  }
}
