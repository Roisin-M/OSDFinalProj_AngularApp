// src/app/routeGuards/role/role.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from '../../services/authentication/auth-custom.service';

export const roleGuard = (requiredRole: 'user' | 'instructor'): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthCustomService);
    const router = inject(Router);
    //check if there is a current user
    const user = authService.currentUser$.value;
    //check if the required role matches the user's role
    if (user && user.role === requiredRole) {
      return true;
    } else {
      //will be redirected to login and informed of role required
      authService.openErrorSnackBar(`Access Denied: Only ${requiredRole}s can access this route.`);
      router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url,
          accessDenied: true
        }
      });
      return false;
    }
  };
};
