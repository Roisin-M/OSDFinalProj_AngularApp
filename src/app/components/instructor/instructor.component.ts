import { Component } from '@angular/core';
import { InstructorsService } from '../../services/instructors/instructors.service';
import { Instructor, YogaSpeciality } from '../../interfaces/instructor';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {
  instructors: Instructor[]=[];
  filteredInstructors: Instructor[] = [];
  message: string ='';
  yogaSpecialities = Object.values(YogaSpeciality);
  selectedSpecialities: string[] = []; //allow multiple select

  //constructor with injection
  constructor(private instructorService: InstructorsService){}

  //ngonit Method
  ngOnInit():void{
    this.instructorService.getInstructors().subscribe({
      next: (value: Instructor[])=>{
        console.log('here');
        this.instructors = value;
        this.filteredInstructors = value; //default to all
      },
        complete:()=> console.log('instructor service finished'),
        error: (error) => {
          console.error(error);
          this.message = 'Failed to load instructors.';
        },
      });
    }

    filterInstructors(): void {
      if (this.selectedSpecialities) {
        this.filteredInstructors = this.instructors.filter((instructor) =>
          this.selectedSpecialities.some((speciality) =>
            instructor.yogaSpecialities.includes(speciality as YogaSpeciality)
          )
        );
      } else {
        this.filteredInstructors = this.instructors; // Show all if no filter is selected
      }
    }

    resetFilter(): void {
      this.selectedSpecialities = []; // Reset the selected filters
      this.filteredInstructors = this.instructors; // Show all instructors
    }
}
