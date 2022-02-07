import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ResultsComponent } from './components/results/results.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { LabComponent } from './components/lab/lab.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AddNewExaminationComponent } from './components/add-new-examination/add-new-examination.component';

import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth.guard';

import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NameFromValueObjectPipe } from './pipes/name-from-value-object.pipe';
import { DateToReadablePipe } from './pipes/date-to-readable.pipe';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AddNewEmployeeComponent } from './components/add-new-employee/add-new-employee.component';
import { AddNewPatientComponent } from './components/add-new-patient/add-new-patient.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { AddNewServiceComponent } from './components/add-new-service/add-new-service.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
