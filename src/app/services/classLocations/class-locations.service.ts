import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassLocationComponent } from '../../components/class-location/class-location.component';
import { ClassLocation } from '../../interfaces/class-location';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Class } from '../../interfaces/class';

@Injectable({
  providedIn: 'root'
})
export class ClassLocationsService {

  constructor(private http: HttpClient  )   {  }
  private classLocationUri =`${environment.apiUri}/classlocations`;

  //get all classLocations Method
  public getClassLocations():Observable<ClassLocation[]>{
    console.log('get class Locations called');
    return this.http.get<ClassLocation[]>(this.classLocationUri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //get class location by id
  public getClasslocation(id:string):Observable<{classLocation:ClassLocation}>{
    let uri=`${this.classLocationUri}/${id}`
    console.log('Fetching instructor by ID:', uri);
    return this.http.get<{classLocation:ClassLocation}>(uri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //update whole document of class location
  updateClassLocation(id:string, classLocation:ClassLocation):Observable<ClassLocation>{
    console.log('subscribing to update/'+id);
    let uri=`${this.classLocationUri}/${id}`
    return this.http.put<ClassLocation>(uri, classLocation)
    .pipe(
      catchError(this.handleError)
    );
  }

  //delete class location by id
  deleteClassLocation(id:string){
    let uri=`${this.classLocationUri}/${id}`
    return this.http.delete<ClassLocation>(uri)
    .pipe(
      catchError(this.handleError)
    );
  }

  //add new calss location to db
  addClasslocation(classlocation:ClassLocation):Observable<ClassLocation>{
    return this.http.post<ClassLocation>(this.classLocationUri, classlocation)
    .pipe(
      catchError(this.handleError)
    );
  }

  //update class location with id
  //error handling
  private handleError(error:HttpErrorResponse){
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
    //return throwError(() => new Error('Something bad happened; please try again later.'));
    return throwError(() => error);
  }
}
