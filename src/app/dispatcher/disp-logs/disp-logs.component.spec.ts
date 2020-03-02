import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispLogsComponent } from './disp-logs.component';

describe('DispLogsComponent', () => {
  let component: DispLogsComponent;
  let fixture: ComponentFixture<DispLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
