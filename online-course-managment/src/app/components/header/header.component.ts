import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, NgIf, MatMenuModule, MatIconModule, MatButtonModule, CommonModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private readonly router = inject(Router);
  // private readonly userService = inject(UserService);
  // user$ = this.userService.user$;
  user$: Observable<string | null>;
  user: string | null = null;
  private userSubscription: Subscription | undefined;
  isSidebarOpen: boolean | undefined;

  constructor(private userService: UserService) {
    this.user$ = this.userService.getUser();
  }

  ngOnInit() {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  logout() {
    this.userService.clearUser();
    this.router.navigate(['login']);
  }
  goLogin() {
    this.router.navigate(['login']);
  }

  goRegister() {
    this.router.navigate(['register']);
  }
}
