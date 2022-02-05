import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToReadable'
})
export class DateToReadablePipe implements PipeTransform {

  transform(date: any): string {
    if (date && date._i && date._i.date && date._i.month && date._i.year) {
      // convert date from datepicker
      return date._i.date + '/' + (date._i.month + 1) + '/' + date._i.year;
    } else if (date && date.includes('-') && date.split('-').length === 3) {
      // convert date from db
      const dateParts = date.split('-');

      return dateParts[2] + '/' + dateParts[1]+ '/' + dateParts[0];
    }

    return '';
  }
}
