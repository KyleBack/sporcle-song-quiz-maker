import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDate',
  standalone: true
})
export class ConvertDatePipe implements PipeTransform {

  private readonly MONTHS_MAP = new Map<number, string>([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9, "October"],
    [10, "November"],
    [11, "December"]
  ]);

  transform(stringDate: string): string {
    const date = new Date(stringDate);
    return `${this.MONTHS_MAP.get(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
  }
}
