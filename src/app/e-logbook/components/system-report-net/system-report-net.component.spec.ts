import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReportNetComponent } from './system-report-net.component';

describe('SystemReportNetComponent', () => {
  let component: SystemReportNetComponent;
  let fixture: ComponentFixture<SystemReportNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemReportNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemReportNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
