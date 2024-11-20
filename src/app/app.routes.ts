import { Routes } from '@angular/router';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ClassLocationComponent}  from './components/class-location/class-location.component';

export const routes: Routes = [
    {path: 'instructor', component: InstructorComponent },
    {path: 'classlocation', component: ClassLocationComponent},
];
