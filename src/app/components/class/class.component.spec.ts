import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassComponent } from './class.component';
import { Class, YogaSpeciality, ClassLevel, ClassCategory, ClassFormat } from '../../interfaces/class';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassComponent - S00223865 - Roisin Muldoon', () => {
  let component: ClassComponent;
  let fixture: ComponentFixture<ClassComponent>;

  // Helper: mock class generator using full interface
  const mockClass = (overrides: Partial<Class>): Class => ({
    _id: 'mock-id',
    instructorId: 'instructor-id',
    description: 'Mock Class',
    classLocationId: 'location-id',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    level: [ClassLevel.Beginner],
    type: [],
    category: [ClassCategory.Relaxation],
    classFormat: ClassFormat.Location,
    spacesAvailable: 10,
    userIds: [],
    ...overrides,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClassComponent,
        HttpClientTestingModule,      // ✅ Provides mocked HttpClient
        NoopAnimationsModule          // ✅ Prevents animation errors from Material
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all classes when no specialities are selected', () => {
    component.classes.set([
      mockClass({ type: [YogaSpeciality.Hatha], description: 'Morning Flow' }),
      mockClass({ type: [YogaSpeciality.Yin], description: 'Evening Relaxation' }),
      mockClass({ type: [YogaSpeciality.PowerYoga], description: 'Intense Burn' }),
    ]);
    component.selectedSpecialities.set([]);
    const result = component.filteredClasses();
    expect(result.length).toBe(3);
  });

  it('should filter by one selected speciality', () => {
    component.classes.set([
      mockClass({ type: [YogaSpeciality.Yin], description: 'Evening Relaxation' }),
    ]);
    component.selectedSpecialities.set([YogaSpeciality.Yin]);
    const result = component.filteredClasses();
    expect(result.length).toBe(1);
    expect(result[0].description).toBe('Evening Relaxation');
  });

  it('should return empty if no match found', () => {
    component.classes.set([
      mockClass({ type: [YogaSpeciality.Hatha], description: 'Flow' }),
    ]);
    component.selectedSpecialities.set([YogaSpeciality.AerialYoga]);
    const result = component.filteredClasses();
    expect(result.length).toBe(0);
  });

  it('should match multiple types if any speciality matches', () => {
    component.classes.set([
      mockClass({ type: [YogaSpeciality.Yin, YogaSpeciality.Restorative], description: 'Calm' }),
      mockClass({ type: [YogaSpeciality.PowerYoga], description: 'Intense' }),
    ]);
    component.selectedSpecialities.set([YogaSpeciality.Yin, YogaSpeciality.PowerYoga]);
    const result = component.filteredClasses();
    expect(result.length).toBe(2);
  });
});
