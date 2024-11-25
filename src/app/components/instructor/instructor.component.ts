import { Component } from '@angular/core';
import { InstructorsService } from '../../services/instructors/instructors.service';
import { Instructor } from '../../interfaces/instructor';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {
  instructors: Instructor[]=[];
  message: string ='';

  //constructor with injection
  constructor(private instructorService: InstructorsService){}

  //ngonit Method
  ngOnInit():void{
    this.instructorService.getInstructors().subscribe({
      next: (value: Instructor[])=>{
        console.log('here');
        this.instructors = value},
        complete:()=> console.log('instructor service finished'),
        error: (message) =>this.message = message
    })
  }
}
