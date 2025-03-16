import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../moduls/lesson';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatListModule, MatCardModule, RouterModule,],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {

  lessons: Lesson[] = [];
  role: string = '';
  errorMessage: string = '';
  newTitle: string = '';
  newContent: string = '';
  courseId: number = 0;
  showAddLessonForm: boolean = false;  
  newLesson = { title: '', content: '' };

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    
    if (typeof window !== 'undefined') {
      this.role = sessionStorage.getItem('role') || ''; 
    }

    console.log('Course ID:', this.courseId);
    this.loadLessons();
  }


  loadLessons(): void {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = sessionStorage.getItem('token'); 
    }

    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    console.log('Loading lessons for course:', this.courseId, 'with token:', token);
    this.lessonsService.getLessons(this.courseId, token).subscribe(
      (data) => {
        console.log('Lessons received:', data);
        this.lessons = data;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }


  goToLessonDetails(lessonId: number) {
    this.router.navigate(['/courses', this.courseId, 'lessons', lessonId]);
  }

  deleteLesson(lessonId: number) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'No token found';
      return;
    }

    this.lessonsService.deleteLesson(this.courseId, lessonId, token).subscribe(
      () => {
       
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      error => {
        console.error('Error deleting lesson:', error);
      }
    );
  }

  navigateToAddLesson(): void {
    console.log('Navigating to:', this.courseId);
    this.router.navigate(['/add-lesson', this.courseId]);
  }

  navigateToEditLesson(lessonId: number): void {
    this.router.navigate(['/edit-lesson', this.courseId, lessonId]);
  }
  
  
}
