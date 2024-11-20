import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstructorComponent } from '../../components/instructor/instructor.component';
import { Observable } from 'rxjs';
import { Instructor } from '../../interfaces/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) { }
  private instructorUri =`http://localhost:3000/yoga-studio-management-api/v1/instructors`;

  //get all instructors method
  public getInstructors(): Observable<Instructor[]>{
    console.log('get instructors called');
    return this.http.get<Instructor[]>(this.instructorUri);
  }

}
