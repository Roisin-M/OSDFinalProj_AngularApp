import { Component } from '@angular/core';
import { ClassLocation } from '../../../../interfaces/class-location';
import { ClassLocationsService } from '../../../../services/classLocations/class-locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CreateClassLocationComponent } from '../../../form-components/createclasslocation/create-class-location/create-class-location.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-class-location-details',
  standalone: true,
  imports: [CreateClassLocationComponent, MatButton,
     MatCardModule],
  templateUrl: './class-location-details.component.html',
  styleUrl: './class-location-details.component.css'
})
export class ClassLocationDetailsComponent {
  id:string|null="";
  classLocation:ClassLocation |null=null;
  showForm:boolean=false;
  successMessage:string='';

  constructor(private route: ActivatedRoute,
    private classLocationsService:ClassLocationsService,
    private router:Router){}

    //get by id from service
    ngOnInit():void{
      this.id=this.route.snapshot.paramMap.get('id');
      console.log('fetched ID: ', this.id);//debugging
      if(this.id){
        console.log('Fetching class location by ID:', this.id);
        this.classLocationsService.getClasslocation(this.id).subscribe({
          next : (response: { classLocation: ClassLocation }) => {
            console.log('Fetched response: ', response); // Debugging
            this.classLocation = response.classLocation; // Extract the nested class location object
            console.log('Extracted class location: ', this.classLocation); // Debugging
          },
          complete: () => console.log('Class location fetching complete'),
          error:(err)=>{
            console.log('error fetching class location: ', err);
          }
        })
      }
    }

    editClassLocation():void{
      this.showForm=true;
    }

    deleteClassLocation():void{
      console.log("in delete");

      if(this.id){
        this.classLocationsService.deleteClassLocation(this.id)
        .subscribe({
          next:() =>{
            this.successMessage = 'Class Location successfully deleted!';
            setTimeout(() => {
              this.router.navigateByUrl('/classlocations'); // Navigate after showing the message
            }, 2000); // Display the message for 2 seconds
          },
            error:(err:Error)=>{
              console.log(err.message);
              //this.message = err
            }
        })
      }
    }
}
