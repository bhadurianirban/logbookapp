import { Component, OnInit, Input } from '@angular/core';
import { FSCTCSC } from '../../models/logbook.model';

@Component({
  selector: 'app-fsc-tcsc',
  templateUrl: './fsc-tcsc.component.html',
  styleUrls: ['./fsc-tcsc.component.scss']
})
export class FscTcscComponent implements OnInit {
  currFsctcscData: FSCTCSC[] = [];
  @Input()
  set fsctcscData(data: FSCTCSC[]) {
    this.currFsctcscData = data;
  }
  constructor() { }

  ngOnInit() {
  }

}
