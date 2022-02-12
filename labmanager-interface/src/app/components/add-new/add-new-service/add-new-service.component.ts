import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination-service';
import { verifyGeneric, verifyName, verifyText } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss']
})
export class AddNewServiceComponent implements OnInit {
  isLinear = false;
  examinationForm: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private examinationService: ExaminationService) {}

  ngOnInit() {
    this.examinationForm = this._formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      laboratory_id: [localStorage.getItem('labId')],
    });
  }

  save() {
    if (this.examinationForm.valid) {
      const name = this.examinationForm.value.name;
      const description = this.examinationForm.value.description;
      const price = this.examinationForm.value.price;
      const laboratory_id = this.examinationForm.value.laboratory_id;

      if (verifyName(name) && verifyText(description) && verifyGeneric(price) && verifyGeneric(laboratory_id)) {
        const examinationType = {
          name: name,
          description: description,
          price: price,
        };
  
        this.examinationService.addExaminationType(examinationType)
          .subscribe((result: any)=> {
            if (result && result.id) {
              this.examinationService.addExaminationTypeToLab(laboratory_id, result.id)
                .subscribe((result: any)=> {
                  if (result) {
                     window.location.href = '/Services';
                  }
                });
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
