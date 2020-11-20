import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhagaulComponent } from './khagaul.component';

describe('KhagaulComponent', () => {
  let component: KhagaulComponent;
  let fixture: ComponentFixture<KhagaulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhagaulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhagaulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
