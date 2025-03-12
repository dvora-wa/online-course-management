import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutComponent } from "../components/layout/layout.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MatToolbarModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'courses';

}
