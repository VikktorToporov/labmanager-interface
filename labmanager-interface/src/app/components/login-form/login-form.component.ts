import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserType } from 'src/app/enums/user-type';
import { PatientService } from 'src/app/services/patient-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  laboratories: any[];
  showLogin = true;
  showLoginInfoTitle = false;
  showError = false;

  constructor(private userService: UserService, private patientService: PatientService, private _formBuilder: FormBuilder) {};

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      window.location.href = '/Lab';
    } else {
      this.loginForm = this._formBuilder.group({
        email: [''],
        password: [''],
      });

      this.signupForm = this._formBuilder.group({
        username: [''],
        email: [''],
        password: [''],
        laboratoryId: [''],
      });
    }

    this.getAllLaboratories();
  }

  login() {
    this.showError = false;

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      if (this.verifyEmail(email) && this.verifyPass(password)) {
        const user = {
          email: email,
          password: password,
        };
    
        this.userService.login(user)
          .subscribe((result: any) => {
            if (result && result.id && result.username && result.laboratoryId && result.laboratoryName && result.dtype) {
              localStorage.setItem('userId', result.id);
              localStorage.setItem('username', result.username);
              localStorage.setItem('labId', result.laboratoryId);
              localStorage.setItem('labName', result.laboratoryName)
              localStorage.setItem('userType', result.dtype);
    
              window.location.href = '/Lab';
            }
          }, error => { this.showError = true; });
      }
    }
  }

  signup() {
    this.showError = false;

    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const laboratoryId = this.signupForm.value.laboratoryId;

      if (this.verifyEmail(email) && this.verifyPass(password) && this.verifyUsername(username) && this.verifyLaboratoryId(laboratoryId)) {
        const user = {
          username: username,
          email: email,
          password: password,
        };

        this.patientService.addPatient(user)
          .subscribe((result: any) => {
            if (result) {
              this.patientService.addPatientToLab(laboratoryId, result.id)
                .subscribe((result: any)=> {
                  if (result) {
                    this.showLogin = true;
                    this.showLoginInfoTitle = true;
                  }
                }, error => { this.showError = true; });
            }
          }, error => { this.showError = true; });
      }
    }
  }

  // HELPER METHODS
  /**
   * Get all laboratories and assign the array to this.laboratories
   */
  getAllLaboratories() {
    this.userService.getAllLaboratories()
    .subscribe((result: any[])=> {
      if (result) {
        this.laboratories = result;
      }
    });
  }

  /**
   * Verify email param
   * @param email email to be verified
   * @returns true or false
   */
  verifyEmail(email: string): boolean {
    if (email != null && email != undefined && email.length > 5 && email.length < 100) {
      return true;
    }

    return false;
  }

  /**
   * Verify pass param
   * @param pass pass to be verified
   * @returns true or false
   */
  verifyPass(pass: string): boolean {
    if (pass != null && pass != undefined && pass.length > 5 && pass.length < 100) {
      return true;
    }

    return false;
  }

  /**
   * Verify username param
   * @param username username to be verified
   * @returns true or false
   */
   verifyUsername(username: string): boolean {
    if (username != null && username != undefined && username.length > 5 && username.length < 10) {
      return true;
    }

    return false;
  }

  /**
   * Verify laboratoryId param
   * @param pass laboratoryId to be verified
   * @returns true or false
   */
   verifyLaboratoryId(laboratoryId: string): boolean {
    if (laboratoryId != null && laboratoryId != undefined) {
      return true;
    }

    return false;
  }

  // DEVELOPMENT ONLY CODE
  // this.userService.signup(UserType.Employee, user)
  //   .subscribe((result: any) => {
  //     if (result) {
  //       this.userService.addUserToLab(laboratoryId, result.id, UserType.Employee)
  //         .subscribe((result: any)=> {
  //           if (result) {
  //             this.showLogin = true;
  //             this.showLoginInfoTitle = true;
  //           }
  //         });
  //     }
  //   });
}
