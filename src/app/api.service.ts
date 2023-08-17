import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtResponse} from "./app.component";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'http://localhost:5017/api/v1/'; // Replace with your actual API URL
  private authToken: string | null = null

  constructor(private http: HttpClient) {
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.authToken) {
      headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  login(Username: string, Pin: string): Observable<JwtResponse> {
    const body = {Username, Pin};
    // @ts-ignore
    return this.http.post(`${this.baseUrl}User/login`, body);
  }

  refresh(refreshToken: string): Observable<any> {
    const body = {refreshToken};
    return this.http.post(`${this.baseUrl}User/refresh`, body)
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  createUser(Username: string, Pin: string): Observable<any> {
    const body = {Username, Pin};
    return this.http.post(`${this.baseUrl}User/create`, body);
  }

  updateUser(Id: bigint, Username: string, Pin: string): Observable<any> {
    const body = {Id, Username, Pin};
    return this.http.post(`${this.baseUrl}User/update`, body);
  }

  deleteUser(Id: bigint): Observable<any> {
    return this.http.delete(`${this.baseUrl}User/delete/${Id}`);
  }

  createAccount(type: number, balance: number, currency: number, active: boolean): Observable<any> {
    const body = {type, balance, currency, active};
    return this.http.post(`${this.baseUrl}Account/create`, body);
  }

  editAccount(id: bigint, type: number, balance: number, currency: number, active: boolean): Observable<any> {
    const body = {id, type, balance, currency, active};
    return this.http.put(`${this.baseUrl}Account/edit`, body);
  }

  deleteAccount(Id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Account/delete/${Id}`);
  }

  getAccountById(Id: bigint): Observable<any> {
    return this.http.get(`${this.baseUrl}Account/GetById/${Id}`);
  }

  getAccounts(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}Account/GetAll`, {headers});
  }

  addBalance(id: bigint, amount: number): Observable<any> {
    const body = {id, amount};
    return this.http.post(`${this.baseUrl}Account/AddBalance`, body);
  }

  subtractBalance(id: bigint, amount: number): Observable<any> {
    const body = {id, amount};
    return this.http.post(`${this.baseUrl}Account/SubtractBalance`, body);
  }

  TransferBalance(fromId: bigint, toId: bigint, amount: number): Observable<any> {
    const body = {fromId, toId, amount};
    return this.http.post(`${this.baseUrl}Account/TransferBalance`, body);
  }

}

