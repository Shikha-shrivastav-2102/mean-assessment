
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // User Registration
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // User Login
  login(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      data
    ).pipe(
      tap(response => {

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('token', response.token);

          sessionStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );
        }

      })
    );
  }

  // User Logout
  logout(): void {

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }

  }

  // Get JWT Token
  getToken(): string | null {

    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }

    return null;
  }

  // Check Login Status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get Logged-in User
  getUser(): any {

    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');

      return user ? JSON.parse(user) : null;
    }

    return null;
  }
}
