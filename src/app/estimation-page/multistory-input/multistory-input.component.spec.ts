import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultistoryInputComponent } from './multistory-input.component';

describe('MultistoryInputComponent', () => {
  let component: MultistoryInputComponent;
  let fixture: ComponentFixture<MultistoryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultistoryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultistoryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
