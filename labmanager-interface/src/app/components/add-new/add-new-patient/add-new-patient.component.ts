import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient-service';
import { verifyEmail, verifyGeneric, verifyPass, verifyUsername } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit {
  isLinear = false;
  patientForm: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private patientService: PatientService) {}

  ngOnInit() {
    this.patientForm = this._formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      laboratory_id: [localStorage.getItem('labId')],
    });
  }

  save() {
    if (this.patientForm.valid) {
      const username = this.patientForm.value.username;
      const password = this.patientForm.value.password;
      const email = this.patientForm.value.email;
      const laboratory_id = this.patientForm.value.laboratory_id;

      if (verifyUsername(username) && verifyPass(password) && verifyEmail(email) && verifyGeneric(laboratory_id)) {
        const patient = {
          username: username,
          password: password,
          email: email,
        };
  
        this.patientService.addPatient(patient)
          .subscribe((result: any)=> {
            if (result && result.id) {
              this.patientService.addPatientToLab(laboratory_id, result.id)
                .subscribe((result: any)=> {
                  if (result) {
                     window.location.href = '/Get/Patients';
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
