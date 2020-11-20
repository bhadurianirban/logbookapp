import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCodeDialogComponent } from './third-party-code-dialog.component';

describe('ThirdPartyCodeDialogComponent', () => {
  let component: ThirdPartyCodeDialogComponent;
  let fixture: ComponentFixture<ThirdPartyCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
