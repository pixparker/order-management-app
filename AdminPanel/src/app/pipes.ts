import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, exponent?: number): string {
    return value?'$'+value.toFixed(2):'N';
  }
} 

@Pipe({name: 'dateTime'})
export class DateTimePipe implements PipeTransform {
  transform(value: any, exponent?: number): string {
      if(!value) return '';
    const date = new Date(value);
    return date.toLocaleString();
  }
}