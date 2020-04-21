import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationPageComponent } from './estimation-page.component';

describe('EstimationPageComponent', () => {
  let component: EstimationPageComponent;
  let fixture: ComponentFixture<EstimationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
