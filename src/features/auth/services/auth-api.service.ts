import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { ILogin } from '../interfaces/ILogin';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { LocalStorageService } from '../../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http: HttpClient = inject(HttpClient);

  private readonly LOGIN_URL = 'https://dummyjson.com/auth/login';
  private readonly GET_USER_URL = 'https://dummyjson.com/auth/me';
  private readonly REFRESH_URL = 'https://dummyjson.com/auth/refresh';

  login(user: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.LOGIN_URL, user);
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(this.GET_USER_URL);
  }

  refreshToken(refreshToken: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.REFRESH_URL, { refreshToken });
  }

}
