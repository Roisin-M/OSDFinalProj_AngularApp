import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InstructorComponent } from '../../components/instructor/instructor.component';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Instructor } from '../../interfaces/instructor';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  private instructorUri = `${environment.apiUri}/instructors`
  constructor(private http: HttpClient) { }

  //get all instructors method
  public getInstructors(): Observable<Instructor[]>{
    console.log('get instructors called');
    return this.http.get<Instructor[]>(this.instructorUri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //takes an id and sends a get request for that individual response
  getInstructor(id: string): Observable<Instructor>{
    let uri=`${this.instructorUri}/${id}`

    return this.http.get<Instructor>(uri)
    .pipe(
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
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
