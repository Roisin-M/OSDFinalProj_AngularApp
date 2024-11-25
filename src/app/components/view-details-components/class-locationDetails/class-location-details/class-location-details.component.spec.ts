import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLocationDetailsComponent } from './class-location-details.component';

describe('ClassLocationDetailsComponent', () => {
  let component: ClassLocationDetailsComponent;
  let fixture: ComponentFixture<ClassLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLocationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
