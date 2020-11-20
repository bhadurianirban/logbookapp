import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookDashboardComponent } from './logbook-dashboard.component';

describe('LogbookDashboardComponent', () => {
  let component: LogbookDashboardComponent;
  let fixture: ComponentFixture<LogbookDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogbookDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
