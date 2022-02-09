import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main
import { LabComponent } from './components/lab/lab.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ResultsComponent } from './components/results/results.component';
import { ServicesComponent } from './components/services/services.component';

// Add new
import { AddNewExaminationComponent, AddNewEmployeeComponent, AddNewPatientComponent, AddNewServiceComponent, AddNewLabComponent } from './components/add-new';

// Edit
import { EditEmployeeComponent, EditExaminationComponent, EditPatientComponent, EditServiceComponent, EditLabComponent } from './components/edit';

// Other
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
  { path: 'Add/Lab', component: AddNewLabComponent, canActivate: [AuthGuard] },
  { path: 'Add/Service', component: AddNewServiceComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Examination/:id', component: EditExaminationComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Employee/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Patient/:id', component: EditPatientComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Lab', component: EditLabComponent, canActivate: [AuthGuard] },
  { path: 'Edit/Service/:id', component: EditServiceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
