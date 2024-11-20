import { Routes } from '@angular/router';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ClassLocationComponent}  from './components/class-location/class-location.component';
import { ClassComponent } from './components/class/class.component';

export const routes: Routes = [
    {path: 'instructors', component: InstructorComponent },
    {path: 'classlocations', component: ClassLocationComponent},
    {path: 'classes', component:ClassComponent},
];
