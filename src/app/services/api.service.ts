import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import  MD5 from "crypto-js/md5";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  apiUrl = 'https://gateway.marvel.com/v1/public/characters?';
  publicKey = '1f0c0fb162d0aae4d7b394910a782c90';
  privateKey = '12696d1c91888071c6488de6b5ad2c313e250caa';


  getCharacter(name: string): Observable<any> {
    const newTs = new Date().getTime();
    const hash = MD5(newTs+this.privateKey+this.publicKey).toString();
    return this.http.get(`${this.apiUrl}ts=${newTs}&name=${name}&apikey=${this.publicKey}&hash=${hash}`);
  }

}
