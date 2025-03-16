import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { Course } from '../../moduls/course ';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule,RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit{
  courseId!: number;
  course: Course = { id: 0, title: '', description: '', teacherId: 0 };  // זה הקורס שאתה רוצה לעדכן
  token: string = sessionStorage.getItem('token') || '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('id')!;  // שליפת מזהה הקורס מה-URL
      this.loadCourse();  // קריאה לפונקציה שמביאה את פרטי הקורס
    });
  }

  loadCourse(): void {
    this.coursesService.getCourseById(this.courseId, this.token).subscribe(
      (course) => {
        this.course = course;  // עדכון פרטי הקורס במשתנה course
      },
      (error) => {
        console.error('Error loading course:', error);
      }
    );
  }

  updateCourse(): void {
    this.coursesService.updateCourse(this.courseId, this.course, this.token).subscribe(
      (response) => {
        console.log('Course updated successfully:', response);
        this.router.navigate(['/courses']);  // ניווט חזרה לדף הקורסים
      },
      (error) => {
        console.error('Error updating course:', error);
      }
    );
  }
}
