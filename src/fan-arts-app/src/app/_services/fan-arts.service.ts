import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/fanArts/';

let getOptions = (tokenService: any) => {

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
export class FanArtsService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  create(title: string, image: string, isPublic: boolean, tag: string, description: string): Observable<any> {
    return this.http.post(AUTH_API + 'create', {
      title,
      image,
      isPublic,
      tag,
      description,
    }, getOptions(this.tokenService));
  }


  getLatestFanArts(): Observable<any> {
    return this.http.get(AUTH_API + 'latestFanArts', getOptions(this.tokenService));
  }
  getAllFanArts(): Observable<any> {
    return this.http.get(AUTH_API + 'catalog', getOptions(this.tokenService));
  }
  getFanArt(_id: any): Observable<any> {
    return this.http.get(AUTH_API + 'details/' + _id, getOptions(this.tokenService));
  }
  getMyFanArts(): Observable<any> {
    return this.http.get(AUTH_API + 'myFanArts', getOptions(this.tokenService));
  }
  searchFanArt(title: string, tag: string): Observable<any> {
    return this.http.post(AUTH_API + 'search', { title, tag }, getOptions(this.tokenService));
  }

  edit(id: string, title: string, image: string, isPublic: boolean, tag: string, description: string): Observable<any> {
    console.log("fan-arts-service---------", title, image, isPublic, tag, description);
    return this.http.put(AUTH_API + id + '/edit', {
      title,
      image,
      isPublic,
      tag,
      description,
    }, getOptions(this.tokenService));
  }
  deleteFanArt(_id: any): Observable<any> {
    return this.http.delete(AUTH_API + _id + '/delete', getOptions(this.tokenService));
  }
  likeFanArt(_id: any): Observable<any> {
    return this.http.get(AUTH_API + _id + '/like', getOptions(this.tokenService));
  }
  dislikeFanArt(_id: any): Observable<any> {
    return this.http.get(AUTH_API + _id + '/dislike', getOptions(this.tokenService));
  }
}
