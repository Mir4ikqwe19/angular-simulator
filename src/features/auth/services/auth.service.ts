import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ILogin } from '../interfaces/ILogin';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, finalize, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { MessageService } from '../../../services/message.service';
import { LoaderService } from '../../../services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private authApiService: AuthApiService = inject(AuthApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private router: Router = inject(Router);

  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();

  private readonly TOKENS_KEY: string = 'tokens';
  
  initAuth(): Observable<IAuthUser | null> {
    const tokens: IToken | null = this.localStorageService.getValue<IToken>(this.TOKENS_KEY);
    const accessToken: string | undefined = tokens?.accessToken;

    if (accessToken) {
      return this.getCurrentUser().pipe(
        catchError(() => {
          this.clearSession();
          return of(null);
        })
      )
    }

    return of(null);
  }

  getProfile(): IAuthUser | null {
    return this.authUserSubject.getValue();
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.authApiService.getUser().pipe(
      tap((user: IAuthUser) => this.authUserSubject.next(user))
    );
  }

  login(user: ILogin): Observable<IAuthUser> {
    this.loaderService.showLoader();
    
    return this.authApiService.login(user).pipe(
      tap((res: IToken) => {
        this.localStorageService.setValue<IToken>(this.TOKENS_KEY, res);
      }),
      switchMap(() => this.getCurrentUser()),
      tap(() => {
        this.messageService.showSucces(`Добро пожаловать ${ user.username }`);
        this.router.navigate(['/home']);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 400) {
          this.messageService.showError(`Ошибка №${ err.status }!`);
        }

        return throwError(() => err);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<IToken> {
    const tokens: IToken = this.localStorageService.getValue<IToken>(this.TOKENS_KEY)!;
    const refreshToken: string = tokens?.refreshToken;

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((res: IToken) => {
        this.localStorageService.setValue(this.TOKENS_KEY, res);
      })
    );
  }

  clearSession(): void {
    this.localStorageService.removeValue(this.TOKENS_KEY);
    this.authUserSubject.next(null);
  }

}
