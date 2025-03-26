import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomService {

  readonly currentUser$ : BehaviorSubject<User | null> ;
  readonly isAuthenticated$ : BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    private router:Router,
    private snackBar: MatSnackBar
  ) {

    // this.currentUser$ = new BehaviorSubject<User | null> 
    // (JSON.parse(localStorage.getItem('user') || '{}'));
    const savedUser = localStorage.getItem('user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    this.currentUser$ = new BehaviorSubject<User | null>(parsedUser);


    const token = localStorage.getItem('token') || '';
    // if there is a token we need to check if it has
    // expired.
   if (token != "") {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // safety check
    if (!payload._id) {
      console.error("Missing _id in token!");
    }
    const expires = payload.exp *1000
    if (expires > Date.now()){
      this.isAuthenticated$ = new BehaviorSubject<boolean>(true)
      this.startAuthenticateTimer(expires);
    }
    else{
       this.isAuthenticated$ = new BehaviorSubject<boolean>(false) 
       this.logout();
    }
  }
  else{
      this.isAuthenticated$ = new BehaviorSubject<boolean>(false)
    }
  }

  private Uri = `${environment.apiUri}`;
  
  private authenticateTimeout?: any;


  public login(email: string, password: string, role: 'user'|'instructor'): Observable<any> {
    let loginEndpoint = '';
    if (role === 'instructor') {
      loginEndpoint = `${this.Uri}/auth/instructor`;
    } else {
      loginEndpoint = `${this.Uri}/auth`;
    }
    return this.http
      .post<any>(loginEndpoint, { email: email, password: password })
      .pipe(
        map((body) => {
          const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
          console.log("Decoded token payload: ", payload);
          const expires = payload.exp *1000
          localStorage.setItem('token', body.accessToken);
          localStorage.setItem('user', JSON.stringify(payload));
          this.currentUser$.next(payload as User);
        //  this.token$.next(body.accessToken);
          this.isAuthenticated$.next(true);
          this.startAuthenticateTimer(expires);
          return;
        })
      );
  }


  private startAuthenticateTimer(expires: number) {

    // set a timeout to re-authenticate with the api one minute before the token expires
    const timeout = expires - Date.now() - (60 * 1000);

    this.authenticateTimeout = setTimeout(() => {
      if (this.isAuthenticated$.value){
      // refresh tokens are not implmented yet so we logout instead.
      //this.getNewAccessToken().subscribe();
      this.logout();
      this.openErrorSnackBar('Session expired. Please log in again.');
      this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      }
    }, timeout);
  }


  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser$.next(null);
 //   this.token$.next('');
    this.isAuthenticated$.next(false);
    if (this.authenticateTimeout) {
      clearTimeout(this.authenticateTimeout);
    }
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }

}

