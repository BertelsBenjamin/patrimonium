import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispTechniciansComponent } from './disp-technicians.component';

describe('DispTechniciansComponent', () => {
  let component: DispTechniciansComponent;
  let fixture: ComponentFixture<DispTechniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispTechniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
