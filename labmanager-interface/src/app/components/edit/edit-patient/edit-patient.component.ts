import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient-service';

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
      laboratory_id: [localStorage.getItem('labId')],
    });
  }

  save() {
    if (this.patientForm.valid) {
      const password = this.patientForm.value.password;
      const email = this.patientForm.value.email;
      const laboratory_id = this.patientForm.value.laboratory_id;

      const patient = {
        id: this.patientId,
        password: password,
        email: email,
        laboratory_id: laboratory_id,
      };

      this.patientService.updatePatient(patient)
        .subscribe((result: any)=> {
          if (result) {
            // window.location.href = '/Get/Patients';
          }
        });
    } else {
      console.log('Invalid Form!');
    }
  }

  remove() {
    this.patientService.removePatient(this.patientId)
      .subscribe((result: any)=> {
        window.location.href = '/Get/Patients';
    });
  }
}
