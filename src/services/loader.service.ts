import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoaderService {
  
  isLoading!: boolean;

  constructor() {}

  showLoader(): void {
    this.isLoading = true;
    document.documentElement.classList.add('no-scroll');
  }

  hideLoader(): void {
    this.isLoading = false;
    document.documentElement.classList.remove('no-scroll');
  }

}
