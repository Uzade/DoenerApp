import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbbookingComponent } from './dumbbooking.component';

describe('DumbbookingComponent', () => {
  let component: DumbbookingComponent;
  let fixture: ComponentFixture<DumbbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
