import { Component} from '@angular/core';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';
import { User } from '../../../../interfaces/user';
import { ClassesService } from '../../../../services/classes/classes.service';
import { Class } from '../../../../interfaces/class';
import { MatCardModule } from '@angular/material/card';
import { BookingsService } from '../../../../services/bookings/bookings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  user: User | null = null;
  bookedClasses: Class[] = [];
  successMessage = '';
  loading = false;

  constructor(
    private authService: AuthCustomService,
    private classService: ClassesService,
    private bookingService: BookingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser$.value;
  
    if (currentUser && currentUser.role === 'user') {
      const userT = currentUser as User;
      this.user = userT;
  
      if (userT._id) {
        this.loadBookedClasses(userT._id);
      } else {
        console.error('User ID is undefined');
      }
    }
  }
  

  loadBookedClasses(userId: string): void {
    this.classService.getClasses().subscribe((classes: Class[]) => {
      this.bookedClasses = classes.filter(cls =>
        cls.userIds?.includes(userId)
      );
    });
  }

  cancelBooking(classId: string): void {
    const userId = this.user?._id;
    if (!userId)
    {
      return;
    } 
        
    this.bookingService.cancelBooking(userId, classId).subscribe({
      next: () => {
        this.successMessage = 'Booking successfully canceled!';
        this.loadBookedClasses(userId);
        this.openSnackBar(this.successMessage);
      },
      error: (err) => {
        console.error('Cancel booking error:', err);
        this.openSnackBar('Failed to cancel the booking.');
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
}
