import { Component, signal, computed } from '@angular/core';
import { Class, YogaSpeciality, ClassFormat, ClassLevel, ClassCategory } from '../../interfaces/class';
import { ClassesService } from '../../services/classes/classes.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Instructor } from '../../interfaces/instructor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthCustomService } from '../../services/authentication/auth-custom.service';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule, DatePipe],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  //classes : Class[]=[];
  //filteredClasses: Class[] =[];
  message: string='';
  yogaSpecialities = Object.values(YogaSpeciality);
  //selectedSpecialities: string[] = [];
  currentUser$: Observable<User | Instructor | null>;
  isAuthenticated$: Observable<boolean>;
  
  //signals
  classes = signal<Class[]>([]);
  selectedSpecialities = signal<string[]>([]);

  //computed signal for filtering
  filteredClasses= computed(() =>{
    const selected = this.selectedSpecialities();
    const all = this.classes();
    if(selected.length === 0){
      return all;
    }
    return all.filter(cls =>
      selected.some(speciality => cls.type.includes(
        speciality as YogaSpeciality
      ))
    )
  });

  //constructor with injection
  constructor(private classesService:ClassesService,
     private snackBar: MatSnackBar,
      private authService: AuthCustomService
  ){
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
   }
  get currentUser(): User | Instructor | null {
    return this.authService.currentUser$.value;
  }
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated$.value;
  }
  get isInstructor(): boolean {
    return this.currentUser?.role === 'instructor';
  }
  //ngonInit Method
  ngOnInit():void{
    this.classesService.getClasses().subscribe({
      next: (value: Class[])=>{
        console.log('here');
        this.classes.set(value);
        //this.filteredClasses = value;
      },
        complete: ()=> console.log('class service finished'),
        error: (error) => {
          console.error(error);
          this.message = 'Failed to load classes.';
        },
      });
  }
  filterClasses(): void{
    this.selectedSpecialities.set([...this.selectedSpecialities()]);
  }
  resetFilter(): void {
    // this.selectedSpecialities = []; // Reset the selected filters
    // this.filteredClasses = this.classes; // Show all classes
    this.selectedSpecialities.set([]);
  }
}
