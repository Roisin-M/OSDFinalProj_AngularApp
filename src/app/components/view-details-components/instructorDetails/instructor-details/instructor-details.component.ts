import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Instructor } from '../../../../interfaces/instructor';
import { InstructorsService } from '../../../../services/instructors/instructors.service';
import { CreateInstructorComponent } from '../../../form-components/createInstructor/create-instructor/create-instructor.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-instructor-details',
  standalone: true,
  imports: [ CreateInstructorComponent, 
    MatCardModule, MatButton],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css'
})
export class InstructorDetailsComponent {

  id:string | null="";
  instructor:Instructor | null=null;
  showForm: boolean = false;
  successMessage:string='';

  //instructor$ : Observable<Instructor> | undefined

  constructor(private route: ActivatedRoute,
    private instructorsService: InstructorsService,
    private router:Router,
    private snackBar: MatSnackBar
  ){}

  //get by id from service
  ngOnInit():void{
    this.id=this.route.snapshot.paramMap.get('id');
    console.log('fetched ID: ', this.id);//debugging
    if(this.id){
      console.log('Fetching instructor by ID:', this.id);
      this.instructorsService.getInstructor(this.id).subscribe({
        next : (response: { instructor: Instructor }) => {
          console.log('Fetched response: ', response); // Debugging
          this.instructor = response.instructor; // Extract the nested instructor object
          console.log('Extracted instructor: ', this.instructor); // Debugging
        },
        complete: () => console.log('Instructor fetching complete'),
        error:(err)=>{
          console.log('error fetching instructor: ', err);
        }
      })
    }
  }

  editInstructor(): void {
    console.log("in edit");
    this.showForm = true; // Show the form for editing
  }
  

  deleteInstructor():void{
    console.log("in delete");

    if(this.id){
      this.instructorsService.deleteInstructor(this.id)
      .subscribe({
        next:() =>{
          this.successMessage = 'Instructor successfully deleted!';
          setTimeout(() => {
            this.router.navigateByUrl('/instructors'); // Navigate after showing the message
          }, 2000); // Display the message for 2 seconds
        },
          error:(err: HttpErrorResponse)=>{
            console.log('Error deleting instructor', err.message);

            //display snackbar message based on error code
            if(err.status === 403){
              this.openErrorSnackBar('Forbidden: You do not have permission to delete this instructor.');
              this.router.navigate(['/login'], {
                queryParams: { sessionExpired: true },
              });
            } else if(err.status === 401){
              this.openErrorSnackBar('Unauthorized: Please log in to delete an instructor');
              this.router.navigate(['/login'],{
                queryParams: {sessionExpired: true},
              });
            } else{
              this.openErrorSnackBar('An error occurred while trying to delete the instructor');
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

  // updateInstructor(updatedInstructor: Instructor): void {
  //   if (this.id) {
  //     this.instructorsService.updateInstructor(this.id, updatedInstructor).subscribe({
  //       next: () => {
  //         this.successMessage = 'Instructor updated successfully!';
  //         this.showForm = false; // Hide the form after updating
  //         setTimeout(() => {
  //           this.successMessage = ''; // Clear the message after 2 seconds
  //         }, 2000);
  //       },
  //       error: (err: Error) => {
  //         console.log('Error updating instructor:', err.message);
  //       },
  //     });
  //   }
  // }
}
