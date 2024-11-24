import { Component } from '@angular/core';
import { Class } from '../../interfaces/class';
import { ClassesService } from '../../services/classes/classes.service';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  classes : Class[]=[];
  message : string='';
  //constructor with injection
  constructor(private classesService:ClassesService){ }
  //ngonInit Method
  ngOnInit():void{
    this.classesService.getClasses().subscribe({
      next: (value: Class[])=>{
        console.log('here');
        this.classes = value},
        complete: ()=> console.log('class service finished'),
        error: (message)=> this.message =message
    })
  }
}
