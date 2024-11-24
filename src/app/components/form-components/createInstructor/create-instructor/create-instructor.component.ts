import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { YogaSpeciality } from '../../../../interfaces/instructor';
//material imports
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import{MatRadioButton, MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatCardModule, 
    MatRadioModule, MatSelectModule],
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
      yogaSpecialities: this.formBuilder.array([])
    });
  }
    //getter to get the formArray
    // get yogaSpecialitiesArray():FormArray{
    //   return this.createInstructorForm.get('yogaSpecialities') as FormArray;
    // }
    // explicitly casts the controls to FormControl[]
    get yogaSpecialitiesArray(): FormArray<FormControl> {
      return this.createInstructorForm.get('yogaSpecialities') as FormArray<FormControl>;
    }
    
    //add a Yoga Speciality
    // addYogaSpeciality(): void{
    //   const specialityControl = this.formBuilder.control('');
    //   this.yogaSpecialitiesArray.push(specialityControl);
    // }
    addYogaSpeciality(): void {
      this.yogaSpecialitiesArray.push(this.formBuilder.control('')); // Adds a FormControl explicitly
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
