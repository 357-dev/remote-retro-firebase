import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroPageComponent } from './retro-page.component';

describe('RetroPageComponent', () => {
  let component: RetroPageComponent;
  let fixture: ComponentFixture<RetroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
