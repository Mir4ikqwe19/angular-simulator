import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ILogin } from '../interfaces/ILogin';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, finalize, Observable, switchMap, tap, throwError } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAuthResponse';
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
  
  isAuthenticated(): boolean {
    return !!this.localStorageService.getValue('tokens');
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.authApiService.getUser().pipe(
      tap((user: IAuthUser) => this.authUserSubject.next(user))
    );
  }

  login(user: ILogin): Observable<IAuthUser> {
    this.loaderService.showLoader();
    
    return this.authApiService.login(user).pipe(
      tap((res: IAuthResponse) => {
        this.localStorageService.setValue<IAuthResponse>('tokens', res);
      }),
      switchMap(() => this.getCurrentUser()),
      tap(() => this.router.navigate(['/home'])),
      catchError((err: HttpErrorResponse) => {
        this.messageService.showError(`${ err.error.message }!`);
        return throwError(() => err);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  logOut(): void {
    this.localStorageService.removeValue('tokens');
    this.authUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<IAuthResponse> {
    const tokens: IAuthResponse = this.localStorageService.getValue<IAuthResponse>('tokens')!;
    const refreshToken: string = tokens?.refreshToken;

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((res: IAuthResponse) => {
        this.localStorageService.setValue('tokens', res);
      })
    );
  }

  initAuth() {
    
  }

}
