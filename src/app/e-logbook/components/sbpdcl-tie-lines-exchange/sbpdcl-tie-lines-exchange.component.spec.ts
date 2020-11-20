import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SBPDCLTieLinesExchangeComponent } from './sbpdcl-tie-lines-exchange.component';

describe('SBPDCLTieLinesExchangeComponent', () => {
  let component: SBPDCLTieLinesExchangeComponent;
  let fixture: ComponentFixture<SBPDCLTieLinesExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SBPDCLTieLinesExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SBPDCLTieLinesExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
