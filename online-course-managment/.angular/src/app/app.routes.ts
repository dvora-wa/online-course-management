import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { EditLessonComponent } from '../components/edit-lesson/edit-lesson.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { AddCoursesComponent } from '../components/add-courses/add-courses.component';
import { teacherGuard } from '../guards/teacher.guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { authGuard } from '../guards/auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
    { path: 'courses/:courseId/lessons', component: LessonsComponent },
    { path: 'lessons/:courseId', component: LessonsComponent },
    { path: 'add-courses', component: AddCoursesComponent ,canActivate: [teacherGuard, authGuard]},
    { path: 'add-lesson/:courseId', component: AddLessonComponent },
    { path: 'edit-lesson/:courseId/:lessonId', component: EditLessonComponent },
    { path: 'edit-course/:id', component: EditCourseComponent }


];
