import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // בודק אם יש טוקן
  }

  logout(): void {
    sessionStorage.clear(); // מוחק את כל הנתונים מה-SessionStorage
    this.router.navigate(['/login']); // מפנה לדף ההתחברות
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }

  navigateToAddCourses() {
    this.router.navigate(['/add-courses']);
  }
}
