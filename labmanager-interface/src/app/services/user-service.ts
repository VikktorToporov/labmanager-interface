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
}