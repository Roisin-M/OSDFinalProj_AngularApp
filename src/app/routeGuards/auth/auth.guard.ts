import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from '../../services/authentication/auth-custom.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  //check if there is a current user
  if (authService.isAuthenticated$.value
  ) {
      return true;
    } else {
      //will be asked to login if arent signed in
      router.navigate(['/login']);
      return false;
    }  
};
