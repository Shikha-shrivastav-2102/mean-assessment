import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  weather: any = null;

  loading = false;

  errorMessage = '';

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {

    this.loading = true;
    this.errorMessage = '';

    this.weatherService.getWeather().subscribe({

      next: (response) => {
        this.weather = response.current;
        this.loading = false;
      },

      error: () => {
        this.errorMessage = 'Unable to fetch weather data';
        this.loading = false;
      }

    });
  }
}