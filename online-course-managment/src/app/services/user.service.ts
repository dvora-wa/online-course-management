import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(name: string): void {
    this.userSubject.next(name);
  }
  getUser(): Observable<string | null> {
    return this.userSubject.asObservable();
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}
