import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../moduls/course ';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  userId: number = 0;
  @Input() role: string = '';
  errorMessage : any;

  isUserTeacher(): boolean {
    return this.role === 'teacher';  // תוודא שהתפקיד נשמר כראוי ב-sessionStorage
  }
  

  constructor(private courseservice: CoursesService,private router: Router) { }


  ngOnInit(): void {
    this.loadUserData();
  }
  
  private loadUserData(): void {
    if (typeof window === 'undefined') {
      console.error('sessionStorage is not available');
      return;
    }
  
    this.userId = parseInt(sessionStorage.getItem('userId') || '0', 10);
    this.role = sessionStorage.getItem('role') || '';
  
    console.log('User role from sessionStorage:', this.role);
  
    if (!this.role) {
      console.error('User role is not defined');
      return;
    }
  
    this.getCourses();
  }
  
  
  

  getCourses(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    this.courseservice.getCourses(token).subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        console.log('Courses loaded successfully', data);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = 'שגיאה בטעינת הקורסים';
      }
    });
  }
  
  
  joinCourse(courseId: number): void {
    const token = sessionStorage.getItem('token');
    if (!token || !this.userId) {
      console.error('No token or userId found');
      return;
    }
  
    this.courseservice.addStudentToCourse(courseId, this.userId).subscribe({
      next: (response) => {
        console.log('You joined successfully:', response);
        alert('נרשמת בהצלחה לקורס!');
      },
      error: (error) => {
        console.error('Error joining course:', error);
        alert('הנך רשום כבר לקורס זה');
      }
    });
  }
  

  LeaveCourse(courseId: number): void {
    this.courseservice.removeStudentFromCourse(courseId,this.userId).subscribe(
      (response) => {
        console.log('You left successfully:', response);
        alert('You left successfully');
      },
      error => {
        console.error('Error leaving course:', error);
      }
    );
  }

  viewLessons(courseId: number): void {
    if (!courseId) {
      console.error('Invalid course ID');
      return;
    }
    this.router.navigate([`/courses/${courseId}/lessons`]);
  }
  

  
  deleteCourse(courseId: number): void {
    // שליחה לקריאת API למחיקת קורס
    this.courseservice.deleteCourse(courseId).subscribe(
      (response) => {
        console.log('Course deleted successfully', response);
        // עדכון הרשימה לאחר מחיקת הקורס
        this.courses = this.courses.filter(course => course.id !== courseId);
      },
      (error) => {
        this.errorMessage = 'שגיאה במחיקת הקורס';
        console.error('Error deleting course:', error);
      }
    );
  }

  navigateToEditCourse(courseId: number){
    this.router.navigate(['/edit-course', courseId]);
  }

}
