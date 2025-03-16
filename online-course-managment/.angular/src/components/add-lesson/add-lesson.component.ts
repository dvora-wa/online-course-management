import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [FormsModule,RouterModule,
    MatCardModule,      // הוסף את המודול הזה
    MatButtonModule,
    MatFormFieldModule,

  ],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  courseId: number = 0;
  newLesson = { title: '', content: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    // ניסיון לקרוא את ה-courseId מהנתיב
    const id = this.route.snapshot.paramMap.get('courseId');
    
    if (id) {
      this.courseId = Number(id);
      console.log('courseId from route:', this.courseId);
    } else {
      console.error('No courseId found in route!');
    }
  }

  addNewLesson(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (!this.courseId || this.courseId === 0) {
      console.error('Invalid courseId:', this.courseId);
      return;
    }

    this.lessonService.addLesson(this.courseId, this.newLesson.title, this.newLesson.content, token)
      .subscribe(
        response => {
          console.log('Lesson added:', response);

          this.router.navigate(['/lessons', this.courseId]); // ניווט חזרה לעמוד השיעורים
        },
        error => {
          console.error('Error adding lesson:', error);
        }
      );
  }
  
}
