import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Class } from '../../../../interfaces/class';
import { ClassesService } from '../../../../services/classes/classes.service';
import { CreateClassComponent } from '../../../form-components/create-class/create-class/create-class.component';
import { BookingsService } from '../../../../services/bookings/bookings.service';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [MatCardModule, MatButton, CreateClassComponent],
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  id:string | null="";
  yogaClass:Class | null=null;
  showForm: boolean = false;
  successMessage:string='';
  //temporary user id
  //userId = '67656f160a8c1c2c7f1fcfd2';

  constructor(private route: ActivatedRoute,
    private classService: ClassesService,
    private bookingService: BookingsService,
    private router:Router,
    private snackBar: MatSnackBar,
    private authService: AuthCustomService
  ){}

  get userId(): string | undefined{
    return this.authService.currentUser$.value?._id ?? undefined;
  }

  //get by id from service
    ngOnInit():void{
      this.id=this.route.snapshot.paramMap.get('id');
      console.log('fetched ID: ', this.id);//debugging
      if(this.id){
        console.log('Fetching class by ID:', this.id);
        this.classService.getClass(this.id).subscribe({
          next : (response: { classItem: Class }) => {
            console.log('Fetched response: ', response); // Debugging
            this.yogaClass = response.classItem; // Extract the nested instructor object
            console.log('Extracted class: ', this.yogaClass); // Debugging
          },
          complete: () => console.log('Class fetching complete'),
          error:(err)=>{
            console.log('error fetching class: ', err);
          }
        })
      }
    }

    editClass(): void {
      console.log("in edit");
      this.showForm = true; // Show the form for editing
    }

    deleteClass():void{
      console.log("in delete");
  
      if(this.id){
        this.classService.deleteClass(this.id)
        .subscribe({
          next:() =>{
            this.successMessage = 'Class successfully deleted!';
            setTimeout(() => {
              this.router.navigateByUrl('/classes'); // Navigate after showing the message
            }, 2000); // Display the message for 2 seconds
          },
            error:(err: HttpErrorResponse)=>{
              console.log('Error deleting class', err.message);
  
              //display snackbar message based on error code
              if(err.status === 403){
                this.openErrorSnackBar('Forbidden: You do not have permission to delete this class.');
                this.router.navigate(['/login'], {
                  queryParams: { sessionExpired: true },
                });
              } else if(err.status === 401){
                this.openErrorSnackBar('Unauthorized: Please log in to delete an class');
                this.router.navigate(['/login'],{
                  queryParams: {sessionExpired: true},
                });
              } else{
                this.openErrorSnackBar('An error occurred while trying to delete the class');
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

    bookClass(): void {
      if (!this.yogaClass || !this.userId){
        this.openErrorSnackBar('User not logged in or class not selected');
        return;
      } 
  
      this.bookingService.bookClass(this.userId, this.yogaClass._id).subscribe({
        next: (response) => {
          this.successMessage = 'Successfully booked this class!';
          console.log(response);
        },
        error: (err) => {
          console.log('Booking error:', err.message);
          this.openErrorSnackBar(err.error?.message || 'Could not book class');
        }
      });
    }
  
}
