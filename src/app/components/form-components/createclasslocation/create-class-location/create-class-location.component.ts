import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl,
   FormBuilder, FormArray, Validators } from '@angular/forms';
import { ClassFormat, ClassLocation } from '../../../../interfaces/class-location';
import { ClassLocationsService } from '../../../../services/classLocations/class-locations.service';
import { Router } from '@angular/router';
//material imports
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import{MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-class-location',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, 
    MatRadioModule, MatSelectModule],
  templateUrl: './create-class-location.component.html',
  styleUrl: './create-class-location.component.css'
})
export class CreateClassLocationComponent {

  createClassLocationForm: FormGroup= new FormGroup({});

  //extract class format enum values
  classFormats=Object.values(ClassFormat);

  constructor(private formBuilder: FormBuilder,
    private classLocationsService:ClassLocationsService,
    private router:Router){}

  ngOnInit():void{
     //initialise the form in the constructor
     this.createClassLocationForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required, 
        Validators.minLength(3)]),
      maxCapacity: new FormControl('', [Validators.required,
        Validators.min(5)]),
      location: new FormControl('',[Validators.required, 
        Validators.minLength(5)]),
      classFormats: this.formBuilder.array([], Validators.required),
  });
  }

  //getter to get the formArray -> explicity cast as type FormControl
  get classFormatsArray():FormArray<FormControl>{
    return this.createClassLocationForm.get('classFormats') as FormArray<FormControl>;
  }
  
  //add a Class Format as form control
  addClassFormat():void{
    const formatControl = this.formBuilder.control('', Validators.required);
    this.classFormatsArray.push(formatControl);
  }

  //getters for validation
  get name(){
    return this.createClassLocationForm.get('name');
  }
  get maxCapacity(){
    return this.createClassLocationForm.get('maxCapacity');
  }
  get location(){
    return this.createClassLocationForm.get('location');
  }

  //remove a Class Format
  removeClassFormat(index: number):void{
    this.classFormatsArray.removeAt(index);
  }
  
  onSubmit(){
    console.log('form submitted with');
    console.log(this.createClassLocationForm.value);
    this.createNew(this.createClassLocationForm.value);
  }

  //submit to class location service
  createNew(formValues:ClassLocation){
    this.classLocationsService.addClasslocation({...formValues})
    .subscribe({
      next: response=>{
        this.router.navigateByUrl('/classlocations')},
        error:(err:Error)=>{
          console.log(err.message);
          //this.message=err
        }
    })
  }

}
