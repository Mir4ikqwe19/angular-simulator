import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IToken } from '../interfaces/IToken';
import { ILogin } from '../interfaces/ILogin';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { LocalStorageService } from '../../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http: HttpClient = inject(HttpClient);

  private readonly URL: string = 'https://dummyjson.com/auth/';

  login(formValue: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.URL }login`, formValue);
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.URL }me`);
  }

  refreshToken(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(`${ this.URL }refresh`, { refreshToken });
  }

}
