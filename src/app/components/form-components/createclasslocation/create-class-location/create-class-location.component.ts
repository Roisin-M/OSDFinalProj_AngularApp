import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ClassFormat } from '../../../../interfaces/class-location';

@Component({
  selector: 'app-create-class-location',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-class-location.component.html',
  styleUrl: './create-class-location.component.css'
})
export class CreateClassLocationComponent {
  createClassLocationForm: FormGroup;
  //extract class format enum values
  classFormats=Object.values(ClassFormat);

  constructor(private formBuilder: FormBuilder){
    //initialise the form in the constructor
    this.createClassLocationForm=this.formBuilder.group({
        name: new FormControl(''),
        maxCapacity: new FormControl(''),
        location: new FormControl(''),
        classFormats: this.formBuilder.array([]),
    });
  }
  //getter to get the formArray
  get classFormatsArray():FormArray{
    return this.createClassLocationForm.get('classFormats') as FormArray;
  }
  
  //add a Class Format
  addClassFormat():void{
    const formatControl = this.formBuilder.control('');
    this.classFormatsArray.push(formatControl);
  }

  //remove a Class Format
  removeClassFormat(index: number):void{
    this.classFormatsArray.removeAt(index);
  }
  
  onSubmit(){
    console.log('form submitted with');
    console.log(this.createClassLocationForm.value);
  }


}
