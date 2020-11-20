import { Component, OnInit, Input } from '@angular/core';
import { STATCOM } from '../../models/logbook.model';

@Component({
  selector: 'app-statcom',
  templateUrl: './statcom.component.html',
  styleUrls: ['./statcom.component.scss']
})
export class StatcomComponent implements OnInit {
  currStatcomData: STATCOM[] = [];
  @Input()
  set statcomData(data: STATCOM[]) {
    this.currStatcomData = data;
  }
  constructor() { }

  ngOnInit() {
  }

}
