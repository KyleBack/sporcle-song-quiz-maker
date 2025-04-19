import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertVideoDuration',
  standalone: true
})
export class ConvertVideoDurationPipe implements PipeTransform {

  readonly HOUR = 'H';
  readonly MINUTE = 'M';
  readonly SECOND = 'S';

  transform(duration: string) {

    const durationMap = new Map<string, string>([
      [this.HOUR, ''],
      [this.MINUTE, ''],
      [this.SECOND, ''],
    ]);

    let num = '';

    for (const char of duration.slice(2)) {
      switch(char) {
        case this.HOUR:
          durationMap.set(this.HOUR, num);
          num = '';
          break;
        case this.MINUTE:
          durationMap.set(this.MINUTE, durationMap.get(this.HOUR) ? num.padStart(2, '0') : num);
          num = '';
          break;
        case this.SECOND:
          durationMap.set(this.SECOND, num.padStart(2, '0'));
          num = '';
          break;
        default:
          num += char;
      }
    }

    // Set placeholder minute value if not provided
    if (!durationMap.get(this.MINUTE)) {
      durationMap.set(this.MINUTE, durationMap.get(this.HOUR) ?  '00' : '0');
    }

    // Set placeholder second value if not provided
    if (!durationMap.get(this.SECOND)) {
      durationMap.set(this.SECOND, '00');
    }

    return [...durationMap.values()].filter(Boolean).join(':');
  }
}
