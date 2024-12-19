import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { AuthCustomService } from './services/authentication/auth-custom.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    MatToolbarModule,
    AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yoga-management-fronend';
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthCustomService, 
    private router: Router) {

    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
  }
}
