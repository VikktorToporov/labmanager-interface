import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {
  isLinear = false;
  laboratoryForm: FormGroup;
  laboratoryId: string;
  laboratoryDetails: any;

  constructor(protected route: ActivatedRoute, private _formBuilder: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.laboratoryId = localStorage.getItem('labId');

    this.employeeService.getLaboratoryDetails(this.laboratoryId)
      .subscribe((result: any)=> {
        this.laboratoryDetails = result;

        this.initForm();
      });
  }

  initForm() {
    this.laboratoryForm = this._formBuilder.group({
      name: [this.laboratoryDetails.hospitalName],
      id: [this.laboratoryId],
    });
  }

  save() {
    if (this.laboratoryForm.valid) {
      const name = this.laboratoryForm.value.name;
      const id = this.laboratoryForm.value.id;

      const laboratory = {
        id: id,
        hospitalName: name,
      };

      this.employeeService.updateLaboratory(laboratory)
        .subscribe((result: any)=> {
          if (result) {
            // window.location.href = '/Get/Employees';
          }
        });
    } else {
      console.log('Invalid Form!');
    }
  }

  remove() {
    this.employeeService.removeLab(this.laboratoryId)
      .subscribe((result: any)=> {
        window.location.href = '/Lab';
    });
  }
}
