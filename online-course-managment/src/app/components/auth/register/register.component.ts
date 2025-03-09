// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-register',
//   imports: [ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss'
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
//   private readonly authService = inject(AuthService);
//   constructor(private fb: FormBuilder) {
//     this.registerForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       role: ['', Validators.required] // שדה בחירה
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       this.authService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.role)
//         .subscribe(response => {
//           console.log('Registration successful', response);
//         }, error => {
//           console.error('Registration failed', error);
//         });
//     }
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      this.dialogRef.close();
    }
  }
}
