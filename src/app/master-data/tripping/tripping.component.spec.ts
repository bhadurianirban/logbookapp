import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippingComponent } from './tripping.component';

describe('TrippingComponent', () => {
  let component: TrippingComponent;
  let fixture: ComponentFixture<TrippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
