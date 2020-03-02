import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TechAcademyComponent } from "./tech_academy.component";

describe("TechAcademyComponent", () => {
  let component: TechAcademyComponent;
  let fixture: ComponentFixture<TechAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechAcademyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
