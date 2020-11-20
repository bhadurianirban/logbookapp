import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookCreateComponent } from './logbook-create.component';

describe('LogbookCreateComponent', () => {
  let component: LogbookCreateComponent;
  let fixture: ComponentFixture<LogbookCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogbookCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
