import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    baseUrl = 'http://localhost:8080/employee';

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
    return this.http.put(`http://localhost:8080/laboratory/${labId}/addEmployee/${employeeId}`, null);
  }

  updateEmployee(values: {
    id: string,
    password: string,
    email: string,
    laboratory_id: string
}) {
    return this.http.put(`${this.baseUrl}/update`, values);
  }

  getEmployeeDetails(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}