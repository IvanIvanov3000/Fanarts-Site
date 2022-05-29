import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/';

let getOptions = (tokenService : any) => {

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
  console.log(httpOptions);
  return httpOptions;
}

@Injectable({
  providedIn: 'root'
})
export class FanArtsService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  create(title: string, image: string, isPublic: boolean, tag: string, description: string): Observable<any> {
    console.log("fan-arts-service---------",title, image, isPublic, tag, description);
    return this.http.post(AUTH_API + 'create', {
      title,
      image,
      isPublic,
      tag,
      description,
    }, getOptions(this.tokenService));
  }
}
