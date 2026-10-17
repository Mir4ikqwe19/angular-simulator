import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly URL: string = 'https://jsonplaceholder.typicode.com/';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${ this.URL }users`);
  }

}
