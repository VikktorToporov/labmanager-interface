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
}