import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = '52a2364eb523751be8d0b46422ecfb88';
  private apiURL = 'http://api.weatherstack.com/current';

  constructor(private http: HttpClient){}

  getWeather(city: string): Observable<any>{
    const url = `${this.apiURL}?access_key=${this.apiKey}&query=${city}`;
    return this.http.get(url);
  }
}


