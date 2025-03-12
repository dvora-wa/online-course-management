import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-register',
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
  errorMessage: string | null = null;
  private readonly authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // שדה בחירה
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.role
      ).subscribe({
        next: response => {
          console.log('Registration successful', response);
        },
        error: error => {
          console.error('Registration failed', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          if (error.status === 400) {
            this.errorMessage = 'Invalid credentials. Please check your email and password.';
          } else if (error.status === 404) {
            this.errorMessage = 'User not found. Please register first.';
          } else if (error.status === 500) {
            this.errorMessage = 'Server error. Please try again later.';
          }
          // Display error message to the user
          // alert(this.errorMessage);
        }
      });
    }
  }
}
