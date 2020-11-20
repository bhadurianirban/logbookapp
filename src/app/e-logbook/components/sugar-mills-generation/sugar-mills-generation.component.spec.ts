import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarMillsGenerationComponent } from './sugar-mills-generation.component';

describe('SugarMillsGenerationComponent', () => {
  let component: SugarMillsGenerationComponent;
  let fixture: ComponentFixture<SugarMillsGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugarMillsGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SugarMillsGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
