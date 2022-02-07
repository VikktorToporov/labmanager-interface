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

    getAllPatientExaminationsByEmployee(id: string) {
        return this.http.get(`${this.baseUrl}/employeeExaminations/${id}`);
    }

    getAllResults(id: string) {
        return this.http.get(`${this.baseUrl}/laboratoryExaminations/${id}`);
    }

    getAllLabExaminations(id: string) {
        return this.http.get(`http://localhost:8080/examination_type/laboratoryExaminationTypes/${id}`);
    }

    // TODO: fix calls
    addExamination(values: {
        completed: boolean,
        information: string,
        employee_id: string,
        patient_id: string,
        madeOnDate: string,
        examinationType_id: string,
        laboratory_id: string,
    }) {
        return this.http.post(`${this.baseUrl}/add`, values);
    }

    addExaminationToLab(labId: string, examId: string) {
        return this.http.put(`http://localhost:8080/laboratory/${labId}/addExamination/${examId}`, null);
    }

    getExaminationDetails(id: string) {
        return this.http.get(`http://localhost:8080/examination_type/${id}`);
    }

    updateExaminationType(values: {
        name: string,
        description: string,
        price: number,
    }) {
        return this.http.put('http://localhost:8080/examination_type/update', values);
    }

    addExaminationType(values: {
        name: string,
        description: string,
        price: string,
      }) {
        return this.http.post('http://localhost:8080/examination_type/add', values);
      }
  
      addExaminationTypeToLab(labId: string, examinationTypeId: string) {
        return this.http.put(`http://localhost:8080/laboratory/${labId}/addExamType/${examinationTypeId}`, null);
      }
}