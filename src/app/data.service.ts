import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getData(): Observable<Object>{
    return this.http.get(this.url)
  }
}
