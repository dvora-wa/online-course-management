// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.scss'
// })
// export class HeaderComponent {

//   private readonly router = inject(Router);

//   goLogin() {
//     this.router.navigate(["login"]);
//   }

//   goRegister()
//   {
//     this.router.navigate(["register"]);
//   }
// }
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);

  openLoginDialog() {
    this.dialog.open(LoginComponent, { width: '400px' });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent, { width: '400px' });
  }
}