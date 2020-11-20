import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatcomComponent } from './statcom.component';

describe('StatcomComponent', () => {
  let component: StatcomComponent;
  let fixture: ComponentFixture<StatcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
