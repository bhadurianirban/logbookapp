import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NBPDCLTieLinesExchangeComponent } from './nbpdcl-tie-lines-exchange.component';

describe('NBPDCLTieLinesExchangeComponent', () => {
  let component: NBPDCLTieLinesExchangeComponent;
  let fixture: ComponentFixture<NBPDCLTieLinesExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NBPDCLTieLinesExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NBPDCLTieLinesExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
