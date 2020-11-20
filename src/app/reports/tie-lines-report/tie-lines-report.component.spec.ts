import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieLinesReportComponent } from './tie-lines-report.component';

describe('TieLinesReportComponent', () => {
  let component: TieLinesReportComponent;
  let fixture: ComponentFixture<TieLinesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieLinesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieLinesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
