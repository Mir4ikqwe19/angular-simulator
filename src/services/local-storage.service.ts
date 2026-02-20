import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setKey<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getKey<T>(key: string): T | null {
    const storageKey: string | null = localStorage.getItem(key);
    return storageKey ? JSON.parse(storageKey) : null;
  }

  removeKey(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
