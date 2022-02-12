import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee-service';
import { verifyUsername, verifyPass, verifyEmail, verifyGeneric } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss']
})
export class AddNewEmployeeComponent implements OnInit {
  isLinear = false;
  employeeForm: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeForm = this._formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      laboratory_id: [localStorage.getItem('labId')],
    });
  }

  save() {
    if (this.employeeForm.valid) {
      const username = this.employeeForm.value.username;
      const password = this.employeeForm.value.password;
      const email = this.employeeForm.value.email;
      const laboratory_id = this.employeeForm.value.laboratory_id;

      if (verifyUsername(username) && verifyPass(password) && verifyEmail(email) && verifyGeneric(laboratory_id)) {
        const employee = {
          username: username,
          password: password,
          email: email,
        };
  
        this.employeeService.addEmployee(employee)
          .subscribe((result: any)=> {
            if (result && result.id) {
              this.employeeService.addEmployeeToLab(laboratory_id, result.id)
                .subscribe((result: any)=> {
                  if (result) {
                     window.location.href = '/Get/Employees';
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
