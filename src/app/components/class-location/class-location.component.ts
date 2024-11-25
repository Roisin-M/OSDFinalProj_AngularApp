import { Component } from '@angular/core';
import { ClassLocationsService } from '../../services/classLocations/class-locations.service';
import { ClassLocation } from '../../interfaces/class-location';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-class-location',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './class-location.component.html',
  styleUrl: './class-location.component.css'
})
export class ClassLocationComponent {
  classLocations : ClassLocation[]=[];
  message: string='';

  //constuctor with injection
  constructor(private classLocationService: ClassLocationsService){}
  
  //ngonit method
  ngOnInit():void{
    this.classLocationService.getClassLocations().subscribe({
      next: (value: ClassLocation[])=>{
        console.log('here');
        this.classLocations = value},
        complete:()=> console.log('class Location service finished'),
        error: (message)=>this.message=message
    })
  }
}
