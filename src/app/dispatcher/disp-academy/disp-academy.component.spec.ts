import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispAcademyComponent } from './disp-academy.component';

describe('DispAcademyComponent', () => {
  let component: DispAcademyComponent;
  let fixture: ComponentFixture<DispAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispAcademyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
