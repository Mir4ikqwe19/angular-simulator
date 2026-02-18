import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorage<T>(key: string): T | null {
    const getValue: string | null = localStorage.getItem(key);
    return getValue ? JSON.parse(getValue) : null;
  }

  removeStorageValue(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
