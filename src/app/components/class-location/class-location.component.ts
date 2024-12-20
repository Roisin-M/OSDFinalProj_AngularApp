import { Component } from '@angular/core';
import { ClassLocationsService } from '../../services/classLocations/class-locations.service';
import { ClassFormat, ClassLocation } from '../../interfaces/class-location';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-class-location',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, FormsModule, MatRadioModule, MatRadioButton],
  templateUrl: './class-location.component.html',
  styleUrl: './class-location.component.css'
})
export class ClassLocationComponent {
  classLocations : ClassLocation[]=[];
  filteredClassLocations: ClassLocation[] = [];
  message: string='';
  classFormats = Object.values(ClassFormat);

  classFormatFilterForm: FormGroup; //form for filtering


  //constuctor with injection
  constructor(
    private classLocationService: ClassLocationsService,
    private fb: FormBuilder){
      // Initialize the filter form
    this.classFormatFilterForm = this.fb.group({
      selectedClassFormat: [null], // No default selection
    });
    }
  
  //ngonit method
  ngOnInit():void{
    this.classLocationService.getClassLocations().subscribe({
      next: (value: ClassLocation[])=>{
        console.log('Fetched class locations:', value);
        this.classLocations = value
        this.filteredClassLocations = value; // Default to show all
      },
        complete:()=> console.log('class Location service finished'),
        error: (message) => {
          console.error(message);
          this.message = 'Failed to load class locations.';
        },
      });
    }
    // Filter class locations based on selected format
    onFilter(): void {
      const selectedFormat: ClassFormat =
        this.classFormatFilterForm.get('selectedClassFormat')?.value;
  
      console.log('Selected format for filtering:', selectedFormat); // Log selected filter value
  
      if (selectedFormat) {
        this.filteredClassLocations = this.classLocations.filter((location) =>
          location.classFormats.includes(selectedFormat)
        );
        console.log('Filtered class locations:', this.filteredClassLocations); // Log filtered results
      } else {
        this.filteredClassLocations = this.classLocations;
        console.log('No format selected, showing all class locations'); // Log fallback to all locations
      }
    }
  
    resetFilter(): void {
      this.classFormatFilterForm.reset();
      this.filteredClassLocations = this.classLocations;
    }
}
