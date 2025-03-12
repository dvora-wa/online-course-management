import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private courseService = inject(CourseService);
  courses$ = this.courseService.getCourses();

  selectCourse(courseId: string): void {
    this.courseService.getCourseDetails(courseId).subscribe(course => {
      console.log('Course selected:', course);
    });
  }
}
