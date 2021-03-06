import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient-service';
import { verifyEmail, verifyGeneric, verifyPass } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  isLinear = false;
  patientForm: FormGroup;
  patientId: string;
  patientDetails: any;

  constructor(protected route: ActivatedRoute, private _formBuilder: FormBuilder, private patientService: PatientService) {}

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      if(params && params.id) {
        this.patientId = params.id;

        this.patientService.getPatientDetails(this.patientId)
          .subscribe((result: any)=> {
            this.patientDetails = result;

            this.initForm();
          });
      }
    });
  }

  initForm() {
    this.patientForm = this._formBuilder.group({
      password: [''],
      email: [this.patientDetails.email],
    });
  }

  save() {
    if (this.patientForm.valid) {
      const password = this.patientForm.value.password;
      const email = this.patientForm.value.email;

      const patient = {
        id: this.patientId,
      };

      if (verifyEmail(email) && this.patientDetails.email !== email) {
        patient['email'] = email;
      }
      
      if (verifyPass(password)) {
        patient['password'] = password;
      }

      this.patientService.updatePatient(patient)
        .subscribe((result: any)=> {
          if (result) {
            window.location.href = '/Get/Patients';
          }
        });
    } else {
      console.log('Invalid Form!');
    }
  }

  remove() {
    if (verifyGeneric(this.patientId)) {
      this.patientService.removePatient(this.patientId)
        .subscribe((result: any)=> {
          window.location.href = '/Get/Patients';
      });
    }
  }
}
