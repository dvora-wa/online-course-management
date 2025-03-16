import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = sessionStorage.getItem('role');

  console.log('Role from localStorage:', role); 

  if (role === 'teacher') {
    console.log('Access granted'); 
    return true; 
  } else {
    console.log('Access denied, redirecting...'); 
    router.navigate(['/login']); 
    return false; 
  }
};

