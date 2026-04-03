import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  showLoader(): void {
    this.loaderSubject.next(true);
    document.documentElement.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.loaderSubject.next(false);
    document.documentElement.style.removeProperty('overflow');
  }

}
