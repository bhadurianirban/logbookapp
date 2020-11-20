import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsWithRestrictionComponent } from './grids-with-restriction.component';

describe('GridsWithRestrictionComponent', () => {
  let component: GridsWithRestrictionComponent;
  let fixture: ComponentFixture<GridsWithRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsWithRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsWithRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
