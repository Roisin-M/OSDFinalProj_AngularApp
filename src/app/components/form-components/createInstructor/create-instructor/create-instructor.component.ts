import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, 
  FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Instructor, YogaSpeciality } from '../../../../interfaces/instructor';
import { InstructorsService } from '../../../../services/instructors/instructors.service';
import { Router } from '@angular/router';
//material imports
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import{MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, 
    MatRadioModule, MatSelectModule],
  templateUrl: './create-instructor.component.html',
  styleUrl: './create-instructor.component.css'
})
export class CreateInstructorComponent {

  @Input() instructor?: Instructor;
  successMessage: string='';

  createInstructorForm: FormGroup=new FormGroup({});

  //Extract Yoga Speciality enum values
  yogaSpecialities = Object.values(YogaSpeciality);

  constructor(private formBuilder: FormBuilder,
    private instructorsService:InstructorsService,
    private router:Router){}

    ngOnInit():void{
      // Check if 'instructor' is provided for editing or not provided for creating
      if (this.instructor) {
        this.initFormWithData();
      } else {
        this.initEmptyForm();
      }
    }

    //initialise empty form if creating new 
    private initEmptyForm(): void{
      this.createInstructorForm = this.formBuilder.group({
        name: new FormControl('',[Validators.required,
          Validators.minLength(3)]),
        email: new FormControl('', [Validators.email, 
          Validators.required]),
        yogaSpecialities: this.formBuilder.array([], Validators.required)
      });
      
    }

    //initialise from with populated data from passed instructor obj
    private initFormWithData(): void{
      this.createInstructorForm = this.formBuilder.group({
        name: new FormControl(this.instructor?.name,[Validators.required,
          Validators.minLength(3)]),
        email: new FormControl(this.instructor?.email, [Validators.email, 
          Validators.required]),
        yogaSpecialities: this.formBuilder.array([], Validators.required)
      });
      this.populateYogaSpecialities(this.instructor?.yogaSpecialities);
    }
 
    //method to populate the yoga specialities for an update
    private populateYogaSpecialities(specialities: string[]| undefined): void {
      const yogaSpecialitiesArray = this.yogaSpecialitiesArray;
      //loop through each yoga Speciality
      if(specialities){//check if specialities is defined
        specialities.forEach((speciality) => {
          yogaSpecialitiesArray.push(this.formBuilder.control(speciality, Validators.required));
      });
      }
  }

    // explicitly casts the controls to FormControl[]
    get yogaSpecialitiesArray(): FormArray<FormControl> {
      return this.createInstructorForm.get('yogaSpecialities') as FormArray<FormControl>;
    }

    //add a Yoga Speciality
    addYogaSpeciality(): void{
      const specialityControl = this.formBuilder.control('', Validators.required);
      this.yogaSpecialitiesArray.push(specialityControl);
    }
  
    //getters for validation
    get name() {
      return this.createInstructorForm.get('name');
    }
    
    get email() {
      return this.createInstructorForm.get('email');
    }

    //remove a speciality
    removeYogaSpeciality(index: number):void{
      this.yogaSpecialitiesArray.removeAt(index);
    }

    onSubmit(){
      console.log('form submitted with ');
      console.table(this.createInstructorForm.value);
      if(!this.instructor){
        console.log('create New method started')
        this.createNew(this.createInstructorForm.value);
      }
      else{
        console.log('update existing method started')
        this.updateExisting(this.instructor._id, 
          this.createInstructorForm.value);
      }
    }

    //submit to instructor service
    createNew(formValues:Instructor){
      this.instructorsService.addInstructor({...formValues})
      .subscribe({
        next: response =>{
          this.successMessage = 'Instructor successfully Created';
          setTimeout(() => {
            this.router.navigateByUrl('/instructors'); // Navigate after showing the message
          }, 2000); // Display the message for 2 seconds
        },
          error: (err:Error)=>{
            console.log(err.message);
            //this.message = err
          }
      })
    }

    //update existing instrutor service
    updateExisting(id:string, updatedValues:Instructor){
      this.instructorsService.updateInstructor(id,{...updatedValues})
      .subscribe({
        next: response=>{
          this.successMessage = 'Instructor successfully Updated';
          setTimeout(() => {
            this.router.navigateByUrl('/instructors'); // Navigate after showing the message
          }, 2000); // Display the message for 2 seconds
        },
        error: (err : Error) => {
          console.log (err.message);
         // this.message = err
        }
      })
    }

}
