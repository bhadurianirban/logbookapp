import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
export class DateFormatService {
    constructor() {}

    getMonthFormat(date): string {
        return date ? moment(date).format('MM/YYYY') : null;
    }

    getStringDate(date): string {
        return date ? moment(date).format('DD/MM/YYYY') : null;
    }

    getStringTime(date): string {
        return date ? moment(date).format('HH:mm') : null;
    }

    getTimeFromString(stringTime: string): Date {
        const d = new Date();
        if (stringTime && stringTime !== '') {
            const [hours, minutes] = stringTime.split(':');
            d.setHours(+hours);
            d.setMinutes(+minutes);
        }
        return d;
    }

    getDateFromString(stringDate: string): Date {
        return stringDate && stringDate !== '' ? moment(stringDate, 'DD/MM/YYYY').toDate() : null;
    }
}
