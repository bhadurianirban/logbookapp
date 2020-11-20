import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NepalFeedersComponent } from './nepal-feeders.component';

describe('NepalFeedersComponent', () => {
  let component: NepalFeedersComponent;
  let fixture: ComponentFixture<NepalFeedersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NepalFeedersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NepalFeedersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
