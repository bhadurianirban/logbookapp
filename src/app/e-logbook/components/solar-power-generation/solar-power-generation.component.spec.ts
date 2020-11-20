import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarPowerGenerationComponent } from './solar-power-generation.component';

describe('SolarPowerGenerationComponent', () => {
  let component: SolarPowerGenerationComponent;
  let fixture: ComponentFixture<SolarPowerGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarPowerGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarPowerGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
