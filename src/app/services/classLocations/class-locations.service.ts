import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassLocationComponent } from '../../components/class-location/class-location.component';
import { ClassLocation } from '../../interfaces/class-location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassLocationsService {

  constructor(private http: HttpClient  )   {  }
  private classLocationUri =`http://localhost:3000/yoga-studio-management-api/v1/classlocations`;

  //get all classLocations Method
  public getClassLocations():Observable<ClassLocation[]>{
    console.log('get class Locations called');
    return this.http.get<ClassLocation[]>(this.classLocationUri);
  }
}
