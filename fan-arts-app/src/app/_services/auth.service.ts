import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/';

let httpOptions = (tokenService: any) => {

  let httpOptions
  const token = tokenService.getToken();
  if (token) {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token })
    };
  } else {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  return httpOptions;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions(this.tokenService));
  }
  register(username: string, email: string, password: string, repeatPassword: string): Observable<any> {
    console.log('register', username, email, password, repeatPassword);
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
      repeatPassword
    }, httpOptions(this.tokenService));
  }
  getProfileInfo(_id: string): Observable<any> {

    return this.http.get(AUTH_API + 'users/profile', httpOptions(this.tokenService));
  }
  editProfileInfo(_id: string, usename: string, email: string): Observable<any> {

    return this.http.put(AUTH_API + 'users/profile',{username: usename, email: email}, httpOptions(this.tokenService));
  }
}