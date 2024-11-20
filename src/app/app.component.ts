import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstructorComponent } from "./components/instructor/instructor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InstructorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yoga-management-fronend';
}
