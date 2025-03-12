import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.authService.register(this.registerForm.value).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        const { token, role } = response;
        if (token && role) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('role', role);
          alert('Registration successful!');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Registration error: Invalid server response.';
        }
      }
    });
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     this.authService.register(
  //       this.registerForm.value.name,
  //       this.registerForm.value.email,
  //       this.registerForm.value.password,
  //       this.registerForm.value.role
  //     ).subscribe({
  //       next: response => {
  //         console.log('Registration successful', response);
  //       },
  //       error: error => {
  //         console.error('Registration failed', error);
  //         this.errorMessage = 'An error occurred. Please try again later.';
  //         if (error.status === 400) {
  //           this.errorMessage = 'Invalid credentials. Please check your email and password.';
  //         } else if (error.status === 404) {
  //           this.errorMessage = 'User not found. Please register first.';
  //         } else if (error.status === 500) {
  //           this.errorMessage = 'Server error. Please try again later.';
  //         }
  //         // Display error message to the user
  //         // alert(this.errorMessage);
  //       }
  //     });
  //   }
  // }
}
