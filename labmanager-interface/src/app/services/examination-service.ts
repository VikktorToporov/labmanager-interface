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

    updateExamination(values: {
        completed: boolean,
        information: string,
        employee_id: string,
        patient_id: string,
        madeOnDate: string,
        examinationType_id: string,
        laboratory_id: string,
    }) {
        return this.http.put(`${this.baseUrl}/update`, values);
    }

    getExaminationDetails(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
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