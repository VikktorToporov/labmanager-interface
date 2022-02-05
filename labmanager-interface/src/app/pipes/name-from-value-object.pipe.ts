import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFromValueObject'
})
export class NameFromValueObjectPipe implements PipeTransform {

  transform(value: string, array: any[]): string {
    let name = '';

    if (value != null && value != undefined && array && array.length > 0) {
       array.forEach(item => {
         if (item.id == value && item.name) {
           name = item.name;
         }
       });
    }

    return name;
  }

}
