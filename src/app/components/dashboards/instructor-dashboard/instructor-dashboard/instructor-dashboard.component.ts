import { Component } from '@angular/core';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';
import { InstructorsService } from '../../../../services/instructors/instructors.service';
import { ClassesService } from '../../../../services/classes/classes.service';
import { Class } from '../../../../interfaces/class';
import { Instructor } from '../../../../interfaces/instructor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateClassComponent } from '../../../form-components/create-class/create-class/create-class.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, DatePipe],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  instructor: Instructor | null = null;
  classes: Class[] = [];
  selectedClass: Class | null = null;
  loading = true;
  showForm = false;
  successMessage = '';

  constructor(
    private authService: AuthCustomService,
    private instructorService: InstructorsService,
    private classService: ClassesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const current = this.authService.currentUser$.value;
    if (current && current.role === 'instructor') {
      this.instructor = current;
      this.instructorService.getInstructorClasses(current._id).subscribe({
        next: (response) => {
          this.classes = response.classes;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading instructor classes', err);
          this.openSnackBar('Failed to load your classes.');
          this.loading = false;
        }
      });
    }
  }

  viewClass(cls: Class): void {
    this.selectedClass = cls;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedClass = null;
  }

  deleteClass(classId: string): void {
    this.classService.deleteClass(classId).subscribe({
      next: () => {
        this.successMessage = 'Class successfully deleted!';
        this.classes = this.classes.filter(cls => cls._id !== classId);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error deleting class', err.message);
        if (err.status === 403) {
          this.openErrorSnackBar('Forbidden: You do not have permission to delete this class.');
        } else if (err.status === 401) {
          this.openErrorSnackBar('Unauthorized: Please log in.');
        } else {
          this.openErrorSnackBar('An error occurred while deleting the class.');
        }
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 5000 });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 5000 });
  }
}
