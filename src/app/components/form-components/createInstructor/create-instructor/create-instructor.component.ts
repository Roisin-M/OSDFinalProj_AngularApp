import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { YogaSpeciality } from '../../../../interfaces/instructor';

@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-instructor.component.html',
  styleUrl: './create-instructor.component.css'
})
export class CreateInstructorComponent {
  createInstructorForm: FormGroup;
  //Extract Yoga Speciality enum values
  yogaSpecialities = Object.values(YogaSpeciality);

  constructor(private formBuilder: FormBuilder){
    //initialise the form in the constructor
    this.createInstructorForm = this.formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      yogaSpecialities: this.formBuilder.array([]),
    });
  }
    //getter to get the formArray
    get yogaSpecialitiesArray():FormArray{
      return this.createInstructorForm.get('yogaSpecialities') as FormArray;
    }

    //add a Yoga Speciality
    addYogaSpeciality(): void{
      const specialityControl = this.formBuilder.control('');
      this.yogaSpecialitiesArray.push(specialityControl);
    }

    //remove a speciality
    removeYogaSpeciality(index: number):void{
      this.yogaSpecialitiesArray.removeAt(index);
    }

    onSubmit(){
      console.log('form submitted with ');
      console.table(this.createInstructorForm.value);
    }
}
