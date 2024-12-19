import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomService } from '../../services/authentication/auth-custom.service';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const authService = inject(AuthCustomService);

  const apiUri = `${environment.apiUri}`;

  const jwt = localStorage.getItem('token');

  // we don't want to attach our token to a request to any other server
  // so we check that the request is to our own api

  if (req.url.startsWith(apiUri) && jwt != '') {
    const authRequest = req.clone({
      setHeaders: { authorization: `Bearer ${jwt}` },
    });

    return next(authRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            authService.logout(); // Clear the token
            router.navigate(['/login'], { queryParams: { sessionExpired: true } });
            console.error('Session expired: Redirecting to login');
            authService.openErrorSnackBar('Session expired. Please log in again.');
          } else if (err.status === 403) {
            console.error('Forbidden: Invalid token');
            authService.openErrorSnackBar('Forbidden: Invalid Credentials');
          }
        } else {
          console.error('An unknown error occurred', err);
        }
        return throwError(() => err);
      })
    );
  } else {
    return next(req);
  }
};
