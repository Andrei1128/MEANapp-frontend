import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl = 'http://localhost:3000/auth';

  constructor(private httpClient: HttpClient) {}

  login(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/signin`, body);
  }
  register(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/signup`, body);
  }
  logout(): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/logout`);
  }
}
