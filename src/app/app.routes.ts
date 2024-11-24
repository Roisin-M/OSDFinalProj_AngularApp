import { Routes } from '@angular/router';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ClassLocationComponent}  from './components/class-location/class-location.component';
import { ClassComponent } from './components/class/class.component';
import { HomeComponent } from './components/home/home/home.component';
import { CreateInstructorComponent } from './components/form-components/createInstructor/create-instructor/create-instructor.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo: '/'},
    {path: 'instructors', component: InstructorComponent },
    {path: 'classlocations', component: ClassLocationComponent},
    {path: 'classes', component:ClassComponent},
    {path: 'createinstructor', component:CreateInstructorComponent}
];
