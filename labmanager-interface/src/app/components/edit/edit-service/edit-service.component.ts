import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination-service';
import { verifyName, verifyText, verifyGeneric } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  isLinear = false;
  examinationForm: FormGroup;
  examinationId: string;
  examinationDetails: any;

  constructor(protected route: ActivatedRoute, private _formBuilder: FormBuilder, private examinationService: ExaminationService) {}

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      if(params && params.id) {
        this.examinationId = params.id;

        this.examinationService.getExaminationTypeDetails(this.examinationId)
          .subscribe((result: any)=> {
            this.examinationDetails = result;

            this.initForm();
          });
      }
    });
  }

  initForm() {
    this.examinationForm = this._formBuilder.group({
      name: [this.examinationDetails.name],
      description: [this.examinationDetails.description],
      price: [this.examinationDetails.price],
    });
  }

  save() {
    if (this.examinationForm.valid) {
      const name = this.examinationForm.value.name;
      const description = this.examinationForm.value.description;
      const price = this.examinationForm.value.price;

      if (verifyName(name) && verifyText(description) && verifyGeneric(price)) {
        const examinationType = {
          id: this.examinationId,
          name: name,
          description: description,
          price: price,
        };
  
        this.examinationService.updateExaminationType(examinationType)
          .subscribe((result: any)=> {
            if (result) {
              window.location.href = '/Services';
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
    this.examinationService.removeExaminationType(this.examinationId)
      .subscribe((result: any)=> {
        window.location.href = '/Services';
    });
  }
}
