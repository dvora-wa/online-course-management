import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../moduls/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl='http://localhost:3000/api/auth'

  constructor(private http: HttpClient) {}

  register(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(error);
      })
    );
  }
  
  
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log("ההתחברות הצליחה")
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
}
