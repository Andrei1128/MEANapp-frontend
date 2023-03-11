import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private readonly serverUrl = 'http://localhost:3000/trip';

  constructor(private httpClient: HttpClient) {}

  getTrips(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}`);
  }

  addTrip(tripInfo: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}`, tripInfo);
  }

  deleteTrip(tripId: string): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/${tripId}`);
  }
}
