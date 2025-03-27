import { Component } from '@angular/core';
import { ClassLocation } from '../../../../interfaces/class-location';
import { ClassLocationsService } from '../../../../services/classLocations/class-locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CreateClassLocationComponent } from '../../../form-components/createclasslocation/create-class-location/create-class-location.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';
import { User } from '../../../../interfaces/user';
import { Instructor } from '../../../../interfaces/instructor';

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

  currentUser$: Observable<User | Instructor | null>;
  isAuthenticated$: Observable<boolean>;
  

  constructor(
    private route: ActivatedRoute,
    private classLocationsService:ClassLocationsService,
    private router:Router,
    private snackBar: MatSnackBar,
    private authService: AuthCustomService  
  ){
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

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

    get currentUser(): User | Instructor | null {
      return this.authService.currentUser$.value;
    }
    get isLoggedIn(): boolean {
      return this.authService.isAuthenticated$.value;
    }
  
    get isInstructor(): boolean {
      return this.currentUser?.role === 'instructor';
    }
  
    get isUser(): boolean {
      return this.currentUser?.role === 'user';
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
 error:(err: HttpErrorResponse)=>{
        console.log('Error deleting class location', err.message);

        //display snackbar message based on error code
        if(err.status === 403){
          this.openErrorSnackBar('Forbidden: You do not have permission to delete this class location');
          this.router.navigate(['/login'], {
            queryParams: { sessionExpired: true },
          });
        } else if(err.status === 401){
          this.openErrorSnackBar('Unauthorized: Please log in to delete a class location');
          this.router.navigate(['/login'],{
            queryParams: {sessionExpired: true},
          });
        } else{
          this.openErrorSnackBar('An error occurred while trying to delete the class location');
        }
      } 
      });
    } else{
      this.openErrorSnackBar('An unknown error occurred. Please try again later');
    }
    }
    openErrorSnackBar(message: string): void {
      this.snackBar.open(message, 'Dismiss', {
        duration: 5000,
      });
    }
}
