import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [FormsModule,RouterModule,MatFormFieldModule,MatCardModule,MatInputModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent implements OnInit{

  courseId: number = 0;
  lessonId: number = 0;
  lesson = { title: '', content: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));

    this.loadLesson();
  }

  loadLesson(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.lessonService.getLessonById(this.courseId, this.lessonId, token).subscribe(
      (data) => {
        this.lesson = data;
      },
      (error) => {
        console.error('Error fetching lesson:', error);
      }
    );
  }

  updateLesson(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.lessonService.updateLesson(this.courseId, this.lessonId, this.lesson.title, this.lesson.content, token)
      .subscribe(
        () => {
          this.router.navigate(['/courses', this.courseId, 'lessons']);
        },
        (error) => {
          console.error('Error updating lesson:', error);
          this.errorMessage = 'שגיאה בעדכון השיעור';
        }
      );
  }
}
