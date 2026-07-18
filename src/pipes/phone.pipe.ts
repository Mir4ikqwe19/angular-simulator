import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../enums/Phone';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(string: string, mode: PhoneMode): string {
    const phoneList: string[] = string
      .replace(/[-x().\s]/g, '')
      .replace(/\d(?!$)/g, '$&,')
      .split(',');
    const countryCode: string[] = phoneList.slice(0, 2);
    const operatorCode: string[] = phoneList.slice(2, 5);
    const subscriberNumber: string[] = phoneList.slice(5, 8);
    const subscriberNumberPart: string[] = phoneList.slice(8, 10);
    const lastNumbers: string[] = phoneList.slice(10, 12);
    const maskedNumber: string = `${ subscriberNumber } ${ subscriberNumberPart }`.replace(/\d/g, '*');

    switch (mode) {
      case PhoneMode.COMPACT:
        return string.replace(/[-x().\s]/g, '').replace('', '+');
      case PhoneMode.INTERNATIONAL:
        return `+${ countryCode } ${ operatorCode } ${ subscriberNumber } ${ subscriberNumberPart } ${ lastNumbers }`.replace(
          /,/g,
          '',
        );
      case PhoneMode.NATIONAL:
        return `${ operatorCode } ${ subscriberNumber } ${ subscriberNumberPart } ${ lastNumbers }`.replace(
          /,/g,
          '',
        );
      case PhoneMode.MASKED:
        return `+${ countryCode } ${ operatorCode } ${ maskedNumber } ${ lastNumbers }`.replace(/,/g, '');
    }
  }

}
