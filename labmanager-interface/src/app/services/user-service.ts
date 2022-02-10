import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getAll() {
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

    signup() {
        const user = {
            username: 'usr',
            password: 'kristiyan',
            dtype: 'patient',
            email: 'email2@email.com',
            laboratory: {
                id: '1'
            }
        };

        return this.http.post(`${this.baseUrl}/user/add`, user);
    }
}