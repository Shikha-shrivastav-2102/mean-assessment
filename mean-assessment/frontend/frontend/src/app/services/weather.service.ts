import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl =
    'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {

    const params = {
      latitude: '22.3072',
      longitude: '73.1812',
      current:
        'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
    };

    return this.http.get(this.apiUrl, { params });
  }
}