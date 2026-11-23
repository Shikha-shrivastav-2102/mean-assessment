import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'

})
export class DashboardComponent implements OnInit {

weather = signal<any>(null);

loading = signal(false);

errorMessage = signal('');
  constructor(
    private weatherService: WeatherService,
    private authService : AuthService,
private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWeather();
  }

loadWeather(): void {

  this.loading.set(true);
  this.errorMessage.set('');

  this.weatherService.getWeather().subscribe({

    next: (response) => {
      this.weather.set(response.current);
      this.loading.set(false);
    },

    error: () => {
      this.errorMessage.set('Unable to fetch weather data');
      this.loading.set(false);
    }

  });
}
logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}