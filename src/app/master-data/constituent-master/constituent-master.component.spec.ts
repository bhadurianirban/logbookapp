import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituentMasterComponent } from './constituent-master.component';

describe('ConstituentMasterComponent', () => {
  let component: ConstituentMasterComponent;
  let fixture: ComponentFixture<ConstituentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstituentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstituentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
