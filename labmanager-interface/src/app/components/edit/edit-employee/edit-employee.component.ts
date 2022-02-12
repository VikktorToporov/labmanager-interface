import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service';
import { verifyEmail, verifyGeneric, verifyPass } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  isLinear = false;
  employeeForm: FormGroup;
  employeeId: string;
  employeeDetails: any;

  constructor(protected route: ActivatedRoute, private _formBuilder: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      if(params && params.id) {
        this.employeeId = params.id;

        this.employeeService.getEmployeeDetails(this.employeeId)
          .subscribe((result: any)=> {
            this.employeeDetails = result;

            this.initForm();
          });
      }
    });
  }

  initForm() {
    this.employeeForm = this._formBuilder.group({
      password: [''],
      email: [this.employeeDetails.email],
    });
  }

  save() {
    if (this.employeeForm.valid) {
      const password = this.employeeForm.value.password;
      const email = this.employeeForm.value.email;

      const employee = {
        id: this.employeeId,
      };

      if (verifyEmail(email) && this.employeeDetails.email !== email) {
        employee['email'] = email;
      }
      
      if (verifyPass(password)) {
        employee['password'] = password;
      }
      
      this.employeeService.updateEmployee(employee)
        .subscribe((result: any)=> {
          if (result) {
            window.location.href = '/Get/Employees';
          }
        });

    } else {
      console.log('Invalid Form!');
    }
  }

  remove() {
    if (verifyGeneric(this.employeeId)) {
      this.employeeService.removeEmployee(this.employeeId)
        .subscribe((result: any)=> {
          window.location.href = '/Get/Employees';
      });
    }
  }
}
