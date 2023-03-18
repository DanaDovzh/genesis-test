import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = 'https://api.wisey.app/api/v1';

  constructor(private http: HttpClient) {}

  getToken() {
    const params = {
      platform: 'subscriptions',
    };
    return this.http.get(`${this.URL}/auth/anonymous`, {
      params,
    });
  }
}
