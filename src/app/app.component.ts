import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { Instructor } from './interfaces/instructor';
import { AuthCustomService } from './services/authentication/auth-custom.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yoga-management-frontend';
  currentUser$: Observable<User | Instructor | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthCustomService,
    private router: Router,
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
    this.authService.openErrorSnackBar('Success: You have been logged out');
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

  get isUser(): boolean {
    return this.currentUser?.role === 'user';
  }
}
