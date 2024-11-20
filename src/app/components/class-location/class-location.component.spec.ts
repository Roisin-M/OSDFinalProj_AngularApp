import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLocationComponent } from './class-location.component';

describe('ClassLocationComponent', () => {
  let component: ClassLocationComponent;
  let fixture: ComponentFixture<ClassLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
