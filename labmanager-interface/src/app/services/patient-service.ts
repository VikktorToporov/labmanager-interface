import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
    baseUrl = 'http://localhost:8080/patient';

    constructor(private http: HttpClient) { }

    getAllPatients(id: string) {
        return this.http.get(`${this.baseUrl}/laboratoryPatients/${id}`);
    }

    addPatient(values: {
      username: boolean,
      password: string,
      email: string,
    }) {
        return this.http.post(`${this.baseUrl}/add`, values);
    }

    addPatientToLab(labId: string, patientId: string) {
      return this.http.put(`http://localhost:8080/laboratory/${labId}/addPatient/${patientId}`, null);
    }

    updatePatient(values: {
      id: string,
      password?: string,
      email?: string,
    }) {
      return this.http.put(`${this.baseUrl}/update`, values);
    }

    getPatientDetails(id: string) {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    removePatient(id: string) {
      return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }
}