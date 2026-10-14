import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(
    value: number | string,
    firstForm: string,
    secondForm: string,
    thirdForm: string,
  ): string {
    const count: number = Number(value);
    const lastDigit: number = count % 10;
    const lastTwoDigits: number = count % 100;

    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      return `${ value } ${ thirdForm }`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${ value } ${ secondForm }`;
    } else if (lastDigit === 1) {
      return `${ value } ${ firstForm }`;
    }

    return `${ value } ${ thirdForm }`;
  }

}
