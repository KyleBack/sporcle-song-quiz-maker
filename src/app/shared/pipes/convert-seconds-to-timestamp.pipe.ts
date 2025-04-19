import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSecondsToTimestamp',
  standalone: true
})
export class ConvertSecondsToTimestampPipe implements PipeTransform {

  transform(totalSeconds: number, includeMilliseconds: boolean): string {
    // Gets numeric values for hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Formats numeric values as strings
    const formattedHours = String(hours);
    const formattedMinutes = String(minutes);
    const formattedSeconds = includeMilliseconds ?
      String(seconds.toFixed(3)).padStart(6, '0') :
      String(Math.floor(seconds)).padStart(2, '0');

    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes.padStart(2, '0')}:${formattedSeconds}`;
    }

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
