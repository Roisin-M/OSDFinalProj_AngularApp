import { Component } from '@angular/core';
import { Class, YogaSpeciality, ClassFormat, ClassLevel, ClassCategory } from '../../interfaces/class';
import { ClassesService } from '../../services/classes/classes.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  classes : Class[]=[];
  filteredClasses: Class[] =[];
  message: string='';
  yogaSpecialities = Object.values(YogaSpeciality);
  selectedSpecialities: string[] = [];

  //constructor with injection
  constructor(private classesService:ClassesService){ }
  //ngonInit Method
  ngOnInit():void{
    this.classesService.getClasses().subscribe({
      next: (value: Class[])=>{
        console.log('here');
        this.classes = value;
        this.filteredClasses = value;
      },
        complete: ()=> console.log('class service finished'),
        error: (error) => {
          console.error(error);
          this.message = 'Failed to load classes.';
        },
      });
  }
  filterClasses(): void{
    if(this.selectedSpecialities){
      this.filteredClasses = this.classes.filter((yogaClass) =>
        this.selectedSpecialities.some((speciality) => 
          yogaClass.type.includes(speciality as YogaSpeciality)
        )
      );
    } else{
      this.filteredClasses = this.classes; //show all if no filter selected
    }
  }
  resetFilter(): void {
    this.selectedSpecialities = []; // Reset the selected filters
    this.filteredClasses = this.classes; // Show all classes
  }
}
