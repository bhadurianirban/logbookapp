import { Component, OnInit, Input } from '@angular/core';
import { ConstituentValue } from '../../models/constituent-value.model';
import { CONSTITUENT_GRIDS_VALUES_HEADERS } from '../../models/table-headers';

@Component({
  selector: 'app-grids-with-restriction',
  templateUrl: './grids-with-restriction.component.html',
  styles: []
})
export class GridsWithRestrictionComponent implements OnInit {
  gridHeaders: any;
  gridsWithRestriction: ConstituentValue[] = [];
  @Input()
  set currGrids(data: ConstituentValue[]) {
    this.gridsWithRestriction = data;
    this.bindData();
  }
  totalRestriction = 0;
  nbRestriction = 0;
  sbRestriction = 0;
  constructor() { }

  ngOnInit() {
    this.gridHeaders = CONSTITUENT_GRIDS_VALUES_HEADERS;
    this.bindData();
  }


  bindData() {
    this.totalRestriction = 0;
    this.nbRestriction = 0;
    this.sbRestriction = 0;
    this.gridsWithRestriction.forEach(element => {
      this.totalRestriction += element.Restriction;
      if (element.Region === 'N') {
        this.nbRestriction += element.Restriction;
      } else {
        this.sbRestriction += element.Restriction;
      }
    });
  }

}
