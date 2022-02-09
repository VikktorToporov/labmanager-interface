import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee-service';

@Component({
  selector: 'app-add-new-lab',
  templateUrl: './add-new-lab.component.html',
  styleUrls: ['./add-new-lab.component.scss']
})
export class AddNewLabComponent implements OnInit {
  isLinear = false;
  laboratoryForm: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.laboratoryForm = this._formBuilder.group({
      name: [''],
    });
  }

  save() {
    if (this.laboratoryForm.valid) {
      const name = this.laboratoryForm.value.name;

      const laboratory = {
        hospitalName: name,
      };

      this.employeeService.addLaboratory(laboratory)
        .subscribe((result: any)=> {
          if (result && result.id) {
            this.employeeService.addEmployeeToLab(result.id, localStorage.getItem('userId'))
              .subscribe((result: any)=> {
                if (result) {
                   window.location.href = '/Lab';
                }
              });
          }
        });
    } else {
      console.log('Invalid Form!');
    }
  }
}
