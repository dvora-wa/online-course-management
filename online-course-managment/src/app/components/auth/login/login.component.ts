import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  private readonly authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: response => {
            console.log('Login successful', response);
            alert('Login successful');
          },
          error: error => {
            console.error('Login failed', error);
            let errorMessage = 'An error occurred. Please try again later.';
            if (error.status === 400) {
              errorMessage = 'Invalid credentials. Please check your email and password.';
            } else if (error.status === 404) {
              errorMessage = 'User not found. Please register first.';
            } else if (error.status === 500) {
              errorMessage = 'Server error. Please try again later.';
            }
            // Display error message to the user
            // alert(errorMessage);
          }
        });
    }
  }
}