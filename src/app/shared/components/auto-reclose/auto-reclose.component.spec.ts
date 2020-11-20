import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRecloseComponent } from './auto-reclose.component';

describe('AutoRecloseComponent', () => {
  let component: AutoRecloseComponent;
  let fixture: ComponentFixture<AutoRecloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoRecloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRecloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
