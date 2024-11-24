import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassLocationComponent } from './create-class-location.component';

describe('CreateClassLocationComponent', () => {
  let component: CreateClassLocationComponent;
  let fixture: ComponentFixture<CreateClassLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClassLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
