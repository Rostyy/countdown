import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayNumber'
})
export class DisplayNumberPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number|string {
    return value < 10 ? `0${value}` : value;
  }
}
