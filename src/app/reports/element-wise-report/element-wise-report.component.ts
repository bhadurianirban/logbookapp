import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MasterElementsData } from 'src/app/shared/models/master-data.model';
import { MasterElement } from 'src/app/shared/models/element.model';
import { GetElementWiseReportTry } from 'src/app/store/actions';
import { ELEMENT_WISE_REPORT_HEADER } from 'src/app/shared/models/table-headers';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { IElementWiseReport } from '../reports.model';

@Component({
  selector: 'app-element-wise-report',
  templateUrl: './element-wise-report.component.html',
  styleUrls: ['./element-wise-report.component.scss']
})
export class ElementWiseReportComponent implements OnInit, OnDestroy {
  rangeDates: Date[];
  destroying = false;
  element: MasterElement;
  allElements: MasterElement[] = [];
  filteredElements: MasterElement[] = [];
  masterElements: MasterElementsData;
  reportData: IElementWiseReport[] = [];
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private dateFormatService: DateFormatService) {
                const startDate = moment().startOf('month').toDate();
                const endDate =  moment().endOf('month').toDate();
                this.rangeDates = [startDate, endDate];
                const startDateString = this.dateFormatService.getStringDate(this.rangeDates[0]);
                const endDateString = this.dateFormatService.getStringDate(this.rangeDates[1]);
                this.store.dispatch(new GetElementWiseReportTry({
                  fromDate: startDateString,
                  toDate: endDateString,
                  elementId: 0
                }));
               }

  ngOnInit() {
    this.selectedColumns = ELEMENT_WISE_REPORT_HEADER;
    this.masterElements = this.route.snapshot.data.masterElements;
    const lineData = this.masterElements.masterElements.linesData.map(x => {
      const thisLine = Object.assign({}, x) as MasterElement;
      thisLine.Name = x.Description;
      return thisLine;
    });
    this.allElements = [...this.masterElements.masterElements.autoReclosureData,
      ...this.masterElements.masterElements.bayData, ...this.masterElements.masterElements.busData,
      ...this.masterElements.masterElements.busReactorData, ...this.masterElements.masterElements.firstTimeChargeData,
      ...this.masterElements.masterElements.fscData, ...this.masterElements.masterElements.hvdcData,
      ...this.masterElements.masterElements.ictData, ...this.masterElements.masterElements.lineReactorData,
      ...lineData, ...this.masterElements.masterElements.statcomData,
      ...this.masterElements.masterElements.tcscData, ...this.masterElements.masterElements.unitsData];

    this.store.pipe(select(fromRoot.selectReportData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.ElementWiseReport) {
        this.reportData = data.ElementWiseReport;
      }
    });
  }

  getReport() {
    if ((this.rangeDates && this.rangeDates.length > 1) || (this.element && this.element.Id > 0)) {
      let startDate = null;
      let endDate = null;
      let id = 0;
      if (this.rangeDates && this.rangeDates.length > 1) {
        startDate = this.dateFormatService.getStringDate(this.rangeDates[0]);
        endDate = this.dateFormatService.getStringDate(this.rangeDates[1]);
      }
      if (this.element && this.element.Id > 0) {
        id = this.element.Id;
      }
      this.store.dispatch(new GetElementWiseReportTry({
        fromDate: startDate,
        toDate: endDate,
        elementId: id
      }));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Element Wise Report',
         detail: 'Please choose date range or/and element to download report', closable: true }
      );
    }
  }

  search($event: any) {
    this.filteredElements = this.allElements.filter(x => x.Name.includes($event.query.toString().toLowerCase()));
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
