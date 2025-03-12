import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
   ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = '';
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.authService.login(this.loginForm.value).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        const { token, userId, role } = response;
        if (token && userId && role) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId.toString());
          sessionStorage.setItem('role', role);
          alert('Login successful!');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login error: Invalid server response.';
        }
      }
    });
  }
}

