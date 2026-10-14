import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { USERS_API_URL } from '../tokens/user-api-url-token';

@Injectable({ providedIn: 'root' })
export class UserApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly URL: string = inject(USERS_API_URL);

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${ this.URL }users`);
  }

}
