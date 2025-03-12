import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module

@Component({
    selector: 'app-add-courses',
    standalone: true,
    imports: [FormsModule, RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      ReactiveFormsModule
    ],
    templateUrl: './add-courses.component.html',
    styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {
  postCourseForm: FormGroup;
  token: string = sessionStorage.getItem("token") ?? "";
isEditMode = false;
  constructor(private fb: FormBuilder, private courseService:CoursesService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    this.postCourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null] 
      })
    });
    if (courseData) {
      this.isEditMode = true; 
    }
  }

  onSubmit(): void {
    const storedUserId = sessionStorage .getItem('userId');
    const userId: string|null=sessionStorage.getItem('userId')


    console.log(userId);
    console.log(this.postCourseForm.value.course.id);
    
   if(this.isEditMode)
   {
    if (this.postCourseForm.valid) {
      console.log(this.postCourseForm.value);
      this.courseService.putCoursr(this.postCourseForm.value.course.title,this.postCourseForm.value.course.description ,userId,this.token,this.postCourseForm.value.course.id ).subscribe({
        next: (data) => {
          this.router.navigate(['/courses']); 
          console.log("הקורס עודכן בהצלחה")      
           console.log(data);    

        }
        , error: (err) => console.log("no")
      });
    };
   }
    else{
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.postCoursr(this.postCourseForm.value.course.title,this.postCourseForm.value.course.description ,userId,this.token ).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"), error: (err) => console.log("no")
        });
      };
    }
    
  }
    
}
