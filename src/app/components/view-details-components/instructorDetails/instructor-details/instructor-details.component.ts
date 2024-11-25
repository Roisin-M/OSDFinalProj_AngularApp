import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Instructor } from '../../../../interfaces/instructor';
import { InstructorsService } from '../../../../services/instructors/instructors.service';
import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { CreateInstructorComponent } from '../../../form-components/createInstructor/create-instructor/create-instructor.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-instructor-details',
  standalone: true,
  imports: [AsyncPipe, CreateInstructorComponent, 
    MatCardModule, MatButton],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css'
})
export class InstructorDetailsComponent {

  id:string | null="";
  showForm: boolean = false;

  instructor$ : Observable<Instructor> | undefined

  constructor(private route: ActivatedRoute,
    private instructorsService: InstructorsService,
    private router:Router
  ){}

  //get by id from service
  ngOnInit():void{
    this.id=this.route.snapshot.paramMap.get('id');
    console.log('fetched ID: ', this.id);//debugging
    if(this.id){
      console.log('Fetching instructor by ID:', this.id);
      this.instructor$ = this.instructorsService.getInstructor(this.id).pipe(
        tap((instructor) => console.log('Fetched instructor:', instructor)) // Debug response
      );
      console.log('Observable assigned:', this.instructor$);
    }
  }

  editInstructor():void{
    this.showForm=true;
  }

  deleteInstructor():void{
    console.log("in delete");

    if(this.id){
      this.instructorsService.deleteInstructor(this.id)
      .subscribe({
        next: response =>{
          this.router.navigateByUrl('/instructors')},
          error:(err:Error)=>{
            console.log(err.message);
            //this.message = err
          }
      })
    }
  }
}
