import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../moduls/course ';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = "http://localhost:3000/api/courses";

  constructor(private http: HttpClient) { }

  getCourses(token: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}` // שולף את ה-token מה-sessionStorage
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return throwError(error);
      })
    );
  }

  getCourseById(courseId: number, token: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // שולף את ה-token מה-sessionStorage
      }
    }).pipe(
      catchError(error => {
        console.error(`Error fetching course with ID ${courseId}:`, error);
        return throwError(error);
      })
    );
  }

  updateCourse(courseId: number, courseData: { title: string, description: string }, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating course:', error);
        return throwError(error);
      })
    );
  }


  deleteCourse(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
  }


  addStudentToCourse(courseId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${courseId}/enroll`, { userId }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).pipe(
      catchError(error => {
        console.error('Error enrolling student in course:', error);
        return throwError(error);
      })
    );
  }

  removeStudentFromCourse(courseId: number, userId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { headers, body: { userId }, });
  }

  postCoursr(title: string, description: string, teacherId: string | null, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course = { title, description, teacherId }
    console.log(course)
    return this.http.post<Course>(`${this.apiUrl}`, course, { headers })
  }

  putCoursr(title: string, description: string, teacherId: string | null, token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course = { title, description, teacherId }
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers })
  }
}
