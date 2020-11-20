import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FscTcscComponent } from './fsc-tcsc.component';

describe('FscTcscComponent', () => {
  let component: FscTcscComponent;
  let fixture: ComponentFixture<FscTcscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FscTcscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FscTcscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
