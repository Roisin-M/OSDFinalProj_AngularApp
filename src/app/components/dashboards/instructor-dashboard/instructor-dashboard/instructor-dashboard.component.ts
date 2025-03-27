import { Component } from '@angular/core';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';
import { InstructorsService } from '../../../../services/instructors/instructors.service';
import { Class } from '../../../../interfaces/class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Instructor } from '../../../../interfaces/instructor';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  instructor: Instructor | null = null;
  classes: Class[] = [];
  loading = true;
 
  constructor(
    private authService: AuthCustomService,
    private instructorService: InstructorsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const current = this.authService.currentUser$.value;
    // Ensure role is instructor first
    if (current && current.role === 'instructor') {
      this.instructor = current;
      const instructorId = current._id;
      this.instructorService.getInstructorClasses(instructorId).subscribe({
        next: (response) => {
          this.classes = response.classes;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading instructor classes', err);
          this.openSnackBar('Failed to load your classes.');
          this.loading = false;
        },
      });
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
}
