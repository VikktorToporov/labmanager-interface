import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Main
import { HeaderComponent } from './components/header/header.component';
import { ResultsComponent } from './components/results/results.component';
import { LabComponent } from './components/lab/lab.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ServicesComponent } from './components/services/services.component';

// Shared
import { InfoBoxComponent } from './components/shared/info-box/info-box.component';
import { ResultsTableComponent } from './components/shared/results-table/results-table.component';

// Add new
import { AddNewExaminationComponent, AddNewEmployeeComponent, AddNewPatientComponent, AddNewServiceComponent, AddNewLabComponent } from './components/add-new';

// Edit
import { EditEmployeeComponent, EditExaminationComponent, EditPatientComponent, EditServiceComponent, EditLabComponent } from './components/edit';

// Other
import { AuthGuard } from './guards/auth.guard';
import { NameFromValueObjectPipe } from './pipes/name-from-value-object.pipe';
import { DateToReadablePipe } from './pipes/date-to-readable.pipe';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsComponent } from './components/patients/patients.component';
import { EmployeesComponent } from './components/employees/employees.component';

export const DateFormats = {
  parse: {
      dateInput: ['DD-MM-YYYY']
  },
  display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServicesComponent,
    ResultsComponent,
    ResultsTableComponent,
    LabComponent,
    InfoBoxComponent,
    LoginFormComponent,
    AddNewExaminationComponent,
    NameFromValueObjectPipe,
    DateToReadablePipe,
    AddNewEmployeeComponent,
    AddNewPatientComponent,
    EditEmployeeComponent,
    EditPatientComponent,
    EditServiceComponent,
    AddNewServiceComponent,
    AddNewLabComponent,
    EditLabComponent,
    EditExaminationComponent,
    PatientsComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    HttpClient,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
