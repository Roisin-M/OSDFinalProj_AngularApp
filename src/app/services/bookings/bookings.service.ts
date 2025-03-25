import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private apiUrl = 'http://localhost:3000/yoga-studio-management-api/v1/book';

  constructor(private http: HttpClient) {}

  bookClass(userId: string, classId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { userId, classId });
  }

  cancelBooking(userId: string, classId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel`, { userId, classId });
  }
}
