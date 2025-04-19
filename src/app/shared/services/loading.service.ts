import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = signal<boolean>(false);

  setIsLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}
