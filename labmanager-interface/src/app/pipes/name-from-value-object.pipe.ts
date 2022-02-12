import { Pipe, PipeTransform } from '@angular/core';
import { verifyGeneric } from '../shared-methods/validations';

@Pipe({
  name: 'nameFromValueObject'
})
export class NameFromValueObjectPipe implements PipeTransform {
  // Return property from object in array that has a matched id with the value param
  transform(value: string, array: any[], property = 'name'): string {
    let name = '';

    if (verifyGeneric(value) && array && array.length > 0) {

       array.forEach(item => {
         if (item.id == value && item[property]) {
           name = item[property];
         }
       });
    }

    return name;
  }

}
