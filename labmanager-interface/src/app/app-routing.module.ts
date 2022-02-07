import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewEmployeeComponent } from './components/add-new-employee/add-new-employee.component';
import { AddNewExaminationComponent } from './components/add-new-examination/add-new-examination.component';
import { AddNewPatientComponent } from './components/add-new-patient/add-new-patient.component';
import { AddNewServiceComponent } from './components/add-new-service/add-new-service.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { LabComponent } from './components/lab/lab.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ResultsComponent } from './components/results/results.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'Login', component: LoginFormComponent },
  { path: 'Lab', component: LabComponent, canActivate: [AuthGuard] },
  { path: 'Services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'Get/:type', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'Get/Results/:id', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'Add/Examination', component: AddNewExaminationComponent, canActivate: [AuthGuard] },
  { path: 'Add/Employee', component: AddNewEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'Add/Patient', component: AddNewPatientComponent, canActivate: [AuthGuard] },
  { path: 'Add/Service', component: AddNewServiceComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Examination/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Employee/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Patient/:id', component: EditPatientComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Service/:id', component: EditServiceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
