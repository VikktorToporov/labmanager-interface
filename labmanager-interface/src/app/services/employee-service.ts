import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    baseUrl = 'http://localhost:8080/employee';
    laboratoryControllerUrl = 'http://localhost:8080/laboratory';

    constructor(private http: HttpClient) { }

    getAllEmployees(id: string) {
        return this.http.get(`${this.baseUrl}/laboratoryEmployees/${id}`);
    }

    addEmployee(values: {
      username: boolean,
      password: string,
      email: string,
    }) {
      return this.http.post(`${this.baseUrl}/add`, values);
    }

    addEmployeeToLab(labId: string, employeeId: string) {
      return this.http.put(`${this.laboratoryControllerUrl}/${labId}/addEmployee/${employeeId}`, null);
    }

    addLaboratory(values: {
      hospitalName: boolean,
    }) {
      return this.http.post(`${this.laboratoryControllerUrl}/add`, values);
    }

    updateEmployee(values: {
      id: string,
      password?: string,
      email?: string,
    }) {
      return this.http.put(`${this.baseUrl}/update`, values);
    }

    getEmployeeDetails(id: string) {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateLaboratory(values: {
      id: string,
      hospitalName: string,
    }) {
      return this.http.put(`${this.laboratoryControllerUrl}/update`, values);
    }

    getLaboratoryDetails(id: string) {
      return this.http.get(`${this.laboratoryControllerUrl}/${id}`);
    }

    removeEmployee(id: string) {
      return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }

    removeLab(id: string) {
      return this.http.delete(`${this.laboratoryControllerUrl}/delete/${id}`);
    }
}