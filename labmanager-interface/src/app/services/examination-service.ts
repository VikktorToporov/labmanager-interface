import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
    baseUrl = 'http://localhost:8080/examination';

    constructor(private http: HttpClient) { }

    getAllPatientExaminations(id: string) {
        return this.http.get(`${this.baseUrl}/patientExaminations/${id}`);
    }

    getAllEmployeeExaminations(id: string) {
        return this.http.get(`${this.baseUrl}/employeeExaminations/${id}`);
    }

    getAllLabExaminations(id: string) {
        return this.http.get(`http://localhost:8080/examination_type/laboratoryExaminationTypes/${id}`);
    }
}