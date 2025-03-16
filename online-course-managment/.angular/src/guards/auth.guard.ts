import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!sessionStorage.getItem('token'); // בודק אם יש טוקן

  if (!isLoggedIn) {
    const router = new Router(); // יצירת מופע של Router
    router.navigate(['/login']); // הפניה לדף ה-Login
    return false;
  }
  
  return true;
};
