import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituentGenerationComponent } from './constituent-generation.component';

describe('ConstituentGenerationComponent', () => {
  let component: ConstituentGenerationComponent;
  let fixture: ComponentFixture<ConstituentGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstituentGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstituentGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
