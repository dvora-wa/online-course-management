import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userService = inject(UserService);

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, role: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password, role }, { headers, observe: 'response' }).pipe(
      tap(() => this.userService.setUser(name))
    );
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers, observe: 'response' }).pipe(
      tap(response => this.userService.setUser(response.body.name))
    );
  }
}
