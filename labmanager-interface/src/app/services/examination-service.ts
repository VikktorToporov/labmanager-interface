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
        return this.http.get(`${this.baseUrl}_type/laboratoryExaminationTypes/${id}`);
    }

    addExamination(values: {
        completed: boolean,
        information: string,
        madeOnDate: string,
    }, patient_id, employee_id, examinationType_id) {
        return this.http.post(`${this.baseUrl}/create/${examinationType_id}/${patient_id}/${employee_id}`, values);
    }

    updateExamination(values: {
        id: string,
        completed: boolean,
        information: string,
        madeOnDate: string,
    }) {
        return this.http.put(`${this.baseUrl}/update`, values);
    }

    getExaminationDetails(id: string) {
        return this.http.get(`${this.baseUrl}/dto/${id}`);
    }

    getExaminationTypeDetails(id: string) {
        return this.http.get(`${this.baseUrl}_type/${id}`);
    }

    updateExaminationType(values: {
        name: string,
        description: string,
        price: number,
    }) {
        return this.http.put(`${this.baseUrl}_type/update`, values);
    }

    addExaminationType(values: {
        name: string,
        description: string,
        price: string,
      }) {
        return this.http.post(`${this.baseUrl}_type/add`, values);
    }
  
    addExaminationTypeToLab(labId: string, examinationTypeId: string) {
        return this.http.put(`http://localhost:8080/laboratory/${labId}/addExamType/${examinationTypeId}`, null);
    }

    removeExamination(id: string) {
        return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }

    removeExaminationType(id: string) {
        return this.http.delete(`${this.baseUrl}_type/delete/${id}`);
    }
}