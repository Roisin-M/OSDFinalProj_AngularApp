import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InstructorComponent } from '../../components/instructor/instructor.component';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Instructor } from '../../interfaces/instructor';
import { environment } from '../../../environments/environment.development';
import { Class } from '../../interfaces/class';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  private instructorUri = `${environment.apiUri}/instructors`
  private apiGateway = `https://7ufxv1oio8.execute-api.eu-west-1.amazonaws.com/dev/instructors`

  constructor(private http: HttpClient) { }

  //get all instructors method via lambda
  public getInstructors(): Observable<Instructor[]>{
    console.log('get instructors called');
    console.log('[InstructorsService] Sending request to Lambda API:', this.apiGateway);
    return this.http.get<any>(this.apiGateway)
    .pipe(
       // mapping 
      map(response => {
        //console.log('Raw response from Lambda:', response);
        const instructors = JSON.parse(response.body); 
        //console.log('Parsed instructors:', instructors);
        return instructors as Instructor[];
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  //takes an id and sends a get request for that individual response
  getInstructor(id: string): Observable<{instructor:Instructor}>{
    let uri=`${this.instructorUri}/${id}`;
    console.log('Fetching instructor by ID:', uri);
    return this.http.get<{instructor:Instructor}>(uri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // takes an id and sents a getrequest for the bookings count
// getBookingCountForInstructor(instructorId: string): Observable<{ count: number }> {
//   const uri = `${this.instructorUri}/${instructorId}/numbookings`;
//   return this.http.get<{ count: number }>(uri).pipe(
//     retry(3),
//     catchError(this.handleError)
//   );
// }

  // takes an id and sends a request for that instructors classes associated
  getInstructorClasses(id: string): Observable<{ classes: Class[] }> {
    const uri = `${this.instructorUri}/${id}/classes`;
    return this.http.get<{ classes: Class[] }>(uri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  // takes an id and sends a get request for the bookings count
getBookingCountForInstructor(instructorId: string): Observable<{ count: number }> {
  const uri = `${this.instructorUri}/${instructorId}/numbookings`;
  return this.http.get<{ count: number }>(uri).pipe(
    tap(),
    retry(3),
    catchError(this.handleError)
  );
}

  
  //update instructor with id
  updateInstructor(id: string, instructor:Instructor):Observable<Instructor>{
    console.log('Subscribing to update/'+ id);
    let uri=`${this.instructorUri}/${id}`
    return this.http.put<Instructor>(uri, instructor)
    .pipe(
      //catchError(this.handleError)
      catchError(this.handleError)
    );
  }

  //delete instructor by id
  deleteInstructor(id: string){
    let uri =`${this.instructorUri}/${id}`
    return this.http.delete<Instructor>(uri)
    .pipe(
      catchError(this.handleError)
    );
  }

  addInstructor(instructor:Instructor): Observable<Instructor>{
    return this.http.post<Instructor>(this.instructorUri, instructor)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
      // Propagate error so the component can handle it
      return throwError(() => error);
  }


}
