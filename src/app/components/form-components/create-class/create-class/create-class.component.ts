import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, 
  FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Class, YogaSpeciality, ClassLevel, ClassCategory, ClassFormat } from '../../../../interfaces/class';
import { ClassesService } from '../../../../services/classes/classes.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassLocation } from '../../../../interfaces/class-location';
import { ClassLocationsService } from '../../../../services/classLocations/class-locations.service';
import { AuthCustomService } from '../../../../services/authentication/auth-custom.service';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, 
    MatRadioModule, MatSelectModule],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css'
})
export class CreateClassComponent {

  @Input() classItem?: Class;
  successMessage: string = '';
  classLocations: ClassLocation[] = [];

  createClassForm: FormGroup = new FormGroup({});

  yogaSpecialities = Object.values(YogaSpeciality);
  classLevels = Object.values(ClassLevel);
  classCategories = Object.values(ClassCategory);
  classFormats = Object.values(ClassFormat);

  constructor(private formBuilder: FormBuilder,
    private classService: ClassesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private classLocationService: ClassLocationsService,
    private authService: AuthCustomService) {}

  ngOnInit(): void {
    this.populateClassLocations();
    if (this.classItem) {
      this.initFormWithData();
    } else {
      this.initEmptyForm();
    }
  }

   // 🔹 Fetch class locations here
   private populateClassLocations(): void {
    this.classLocationService.getClassLocations().subscribe({
      next: (locations) => {
        this.classLocations = locations;
      },
      error: (err) => {
        console.error('Failed to fetch class locations:', err);
        this.snackBar.open('Could not load class locations', 'Dismiss', {
          duration: 3000
        });
      }
    });
  }

  private initEmptyForm(): void {
    const instructorId = this.authService.currentUser$.value?._id;

    this.createClassForm = this.formBuilder.group({
      instructorId: new FormControl(instructorId, Validators.required),
      classLocationId: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      date: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      spacesAvailable: new FormControl(1, [Validators.required, Validators.min(1)]),
      classFormat: new FormControl('', Validators.required),
      type: this.formBuilder.array([], Validators.required),
      level: this.formBuilder.array([], Validators.required),
      category: this.formBuilder.array([], Validators.required)
    });
  }

  private initFormWithData(): void {
    this.createClassForm = this.formBuilder.group({
      instructorId: new FormControl(this.classItem?.instructorId, Validators.required),
      classLocationId: new FormControl(this.classItem?.classLocationId, Validators.required),
      description: new FormControl(this.classItem?.description, [Validators.required, Validators.minLength(10)]),
      date: new FormControl(this.formatDate(this.classItem?.date), Validators.required),
      startTime: new FormControl(this.classItem?.startTime, Validators.required),
      endTime: new FormControl(this.classItem?.endTime, Validators.required),
      spacesAvailable: new FormControl(this.classItem?.spacesAvailable, [Validators.required, Validators.min(1)]),
      classFormat: new FormControl(this.classItem?.classFormat, Validators.required),
      type: this.formBuilder.array([], Validators.required),
      level: this.formBuilder.array([], Validators.required),
      category: this.formBuilder.array([], Validators.required)
    });
    this.populateYogaSpecialities(this.classItem?.type);
    this.populateClassLevels(this.classItem?.level);
    this.populateCategories(this.classItem?.category);
  }
  //method to format date as iso
  private formatDate(dateInput: Date | string | undefined): string | null {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0]; //'YYYY-MM-DD'
  }
  
    //methods to populate the arrays for an update
    private populateYogaSpecialities(specialities: string[]| undefined): void {
      const yogaSpecialitiesArray = this.yogaSpecialitiesArray;
      //loop through each yoga Speciality
      if(specialities){//check if specialities is defined
        specialities.forEach((speciality) => {
          yogaSpecialitiesArray.push(this.formBuilder.control(speciality, Validators.required));
      });
      }
  }
    private populateClassLevels(levels: string[]| undefined): void {
      const classLevelsArray = this.classLevelsArray;
      //loop through each level
      if(levels){//check if level is defined
        levels.forEach((level) => {
          this.classLevelsArray.push(this.formBuilder.control(level, Validators.required));
      });
      }
  }
    //methods to populate the arrays for an update
    private populateCategories(categories: string[]| undefined): void {
      const classCategoriesArray = this.classCategoriesArray;
      //loop through each category
      if(categories){//check if categories is defined
        categories.forEach((category) => {
          classCategoriesArray.push(this.formBuilder.control(category, Validators.required));
      });
      }
  }

  //getters for validation
  get description() {
    return this.createClassForm.get('description');
  }

  get yogaSpecialitiesArray(): FormArray<FormControl> {
    return this.createClassForm.get('type') as FormArray<FormControl>;
  }

  get classLevelsArray(): FormArray<FormControl> {
    return this.createClassForm.get('level') as FormArray<FormControl>;
  }

  get classCategoriesArray(): FormArray<FormControl> {
    return this.createClassForm.get('category') as FormArray<FormControl>;
  }

  get classFormatsArray(): FormArray<FormControl>{
    return this.createClassForm.get('classFormat') as FormArray<FormControl>;
  }

  addYogaSpeciality(): void{
    const specialityControl = this.formBuilder.control('', Validators.required);
    this.yogaSpecialitiesArray.push(specialityControl);
  }

  addClassLevel(): void {
    const levelControl = this.formBuilder.control('', Validators.required);
    this.classLevelsArray.push(levelControl);
  }

  addClassCategory(): void {
    const categoryControl = this.formBuilder.control('', Validators.required);
    this.classCategoriesArray.push(categoryControl);
  }

  removeYogaSpeciality(index: number): void {
    this.yogaSpecialitiesArray.removeAt(index);
  }

  removeClassLevel(index: number): void {
    this.classLevelsArray.removeAt(index);
  }

  removeClassCategory(index: number): void {
    this.classCategoriesArray.removeAt(index);
  }

  onSubmit(): void {
    console.log('form submitted');
    console.table(this.createClassForm.value);
    if (!this.classItem) {
      this.createNew(this.createClassForm.value);
    } else {
      this.updateExisting(this.classItem._id, this.createClassForm.value);
    }
  }

  createNew(formValues: Class): void {
    this.classService.addClass({ ...formValues })
      .subscribe({
        next: () => {
          this.successMessage = 'Class successfully created';
          setTimeout(() => this.router.navigateByUrl('/classes'), 2000);
        },
        error: (err: Error) => console.log(err.message)
      });
  }

  updateExisting(id: string, updatedValues: Class): void {
    this.classService.updateClass(id, { ...updatedValues })
      .subscribe({
        next: () => {
          this.successMessage = 'Class successfully updated';
          setTimeout(() => this.router.navigateByUrl('/classes'), 2000);
        },
        error: (err: HttpErrorResponse) => this.handleUpdateError(err)
      });
  }

  private handleUpdateError(err: HttpErrorResponse): void {
    console.log('Error updating class:', err.message);
    if (err.status === 403) {
      this.openErrorSnackBar('Forbidden: You do not have permission to update this class.');
      this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
    } else if (err.status === 401) {
      this.openErrorSnackBar('Unauthorized: Please log in to update this class.');
      this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
    } else {
      this.openErrorSnackBar('An error occurred while trying to update the class.');
    }
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 5000 });
  }
}
