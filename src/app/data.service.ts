import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://bz-iccc.herokuapp.com/api';
  constructor(private http: HttpClient) { }
  getratings(route) {
    return this.http.get(this.url + route);
  }
  getuserdetails(route) {
    return this.http.get(this.url + route);
  }

  getcollegedetails(route) {
    return this.http.get(this.url + route);
  }

  getleaderboard(route) {
    return this.http.get(this.url + route);
  }

  getrandomfact() {
    return this.http.get('https://type.fit/api/quotes');
  }
}
