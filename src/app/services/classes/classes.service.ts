import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassComponent } from '../../components/class/class.component';
import { Class } from '../../interfaces/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }
  private classUri=`http://localhost:3000/yoga-studio-management-api/v1/classes`;
  //get all classes Method
  public getClasses():Observable<Class[]>{
  console.log('get classes called');
  return this.http.get<Class[]>(this.classUri);
  }
}
