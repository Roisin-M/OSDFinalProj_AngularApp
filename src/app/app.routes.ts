import { Routes } from '@angular/router';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ClassLocationComponent}  from './components/class-location/class-location.component';
import { ClassComponent } from './components/class/class.component';
import { HomeComponent } from './components/home/home/home.component';
import { CreateInstructorComponent } from './components/form-components/createInstructor/create-instructor/create-instructor.component';
import { CreateClassComponent } from './components/form-components/create-class/create-class/create-class.component';
import { CreateClassLocationComponent } from './components/form-components/createclasslocation/create-class-location/create-class-location.component';
import { InstructorDetailsComponent } from './components/view-details-components/instructorDetails/instructor-details/instructor-details.component';
import { ClassLocationDetailsComponent } from './components/view-details-components/class-locationDetails/class-location-details/class-location-details.component';
import { LoginComponent } from './components/authentication/login/login/login.component';
import { audit } from 'rxjs';
import { authGuard } from './routeGuards/auth/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo: '/'},
    {path: 'instructors', component: InstructorComponent },
    {path: 'classlocations', component: ClassLocationComponent},
    {path: 'classes', component:ClassComponent},
    {path: 'createinstructor', component:CreateInstructorComponent, canActivate: [authGuard]},
    {path: 'createclasslocation', component:CreateClassLocationComponent, canActivate: [authGuard]},
    {path: 'instructors/:id', component:InstructorDetailsComponent},
    {path: 'classlocations/:id', component:ClassLocationDetailsComponent},
    {path: 'login', component:LoginComponent}
];
