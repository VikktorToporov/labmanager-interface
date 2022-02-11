import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserType } from '../enums/user-type';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getAllLaboratories() {
        return this.http.get(`${this.baseUrl}/laboratory/all`);
    }

    getLab(id: string) {
        return this.http.get(`${this.baseUrl}/laboratory/${id}`);
    }

    login(user: {
        email: string,
        password: string,
    }) {
        return this.http.get(`${this.baseUrl}/user/userAuth?email=${user.email}&password=${user.password}`);
    }

    signup(userType: UserType, user: {
        username: string,
        password: string,
        email: string,
    }) {
        return this.http.post(`${this.baseUrl}/${UserType[userType].toLowerCase()}/add`, user);
    }

    addUserToLab(labId: string, userId: string, userType: UserType) {
        return this.http.put(`${this.baseUrl}/laboratory/${labId}/add${UserType[userType]}/${userId}`, null);
    }
}