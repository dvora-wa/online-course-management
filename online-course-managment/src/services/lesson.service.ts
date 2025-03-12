import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../moduls/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessons(courseId: number, token: string) {
    console.log('Fetching lessons for course:', courseId, 'with token:', token);
    return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getLessonById(courseId: number, lessonId: number, token: string) {
    const url = `http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Lesson>(url, { headers }); // מחזיר אובייקט בודד מסוג Lesson
  }
  
  addLesson(courseId: number, title: string, content: string, token: string): Observable<Lesson> {
    const url = `http://localhost:3000/api/courses/${courseId}/lessons`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.post<Lesson>(url, { title, content, courseId }, { headers });
  }

  updateLesson(courseId: number, lessonId: number, title: string, content: string, token: string) {
    const url = `http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(url, { title, content, courseId }, { headers });
  }

  deleteLesson(courseId: number, lessonId: number, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
