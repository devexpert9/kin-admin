import {Http,URLSearchParams} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AdminService {
  constructor(private http: Http, private httpClient: HttpClient) { }

  // postData(link, formdata):Observable<EventData[]>{
  //   return this.http.post<EventData[]>('https://www.kin-4u.com:8080/' + link, formdata);
  // }

  public postData(link, formdata){
    return this.httpClient.post('http://3.134.83.117:3000/'+link, formdata);
  }
  
  getData(link) {
     return this.http.get(link).pipe((data)=>{
       return data;
     }, error => {
       return error;
     });
  }
}