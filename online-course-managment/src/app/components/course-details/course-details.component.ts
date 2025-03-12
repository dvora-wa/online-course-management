import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  course$ = this.courseService.getCourseDetails(this.route.snapshot.params['id']);
}
