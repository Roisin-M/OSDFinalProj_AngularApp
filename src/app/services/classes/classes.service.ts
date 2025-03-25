import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassComponent } from '../../components/class/class.component';
import { Class } from '../../interfaces/class';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private classUri=`${environment.apiUri}/classes`;
  constructor(private http: HttpClient) { }

  //get all classes Method
  public getClasses():Observable<Class[]>{
  console.log('get classes called');
  return this.http.get<Class[]>(this.classUri)
   .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  //takes an id and sends a get request for that individual response
  getClass(id: string): Observable<{classItem:Class}>{
    let uri=`${this.classUri}/${id}`;
    console.log('fetching class by id:',uri);
    return this.http.get<{classItem:Class}>(uri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //update class with id
  updateClass(id: string, yogaClass:Class):Observable<Class>{
    console.log('Subscribing to update/' +id);
    let uri=`${this.classUri}/${id}`
    return this.http.put<Class>(uri, yogaClass)
    .pipe(
      catchError(this.handleError)
    );
  }

  //delete class by id
  deleteClass(id: string){
    let uri=`${this.classUri}/${id}`
    return this.http.delete<Class>(uri)
    .pipe(
      catchError(this.handleError)
    )
  }

  //create class
  addClass(classItem:Class): Observable<Class>{
    return this.http.post<Class>(this.classUri, classItem)
    .pipe(
      catchError(this.handleError)
    )
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
