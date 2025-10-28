import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Weather } from '../services/weather';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';
  searchHistory: string[] = [];

  constructor(private weatherService: Weather){}

  getWeather(){
    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name';
      return;
    }

    this.weatherData = null;
    this.errorMessage = '';

    if (!this.searchHistory.includes(this.city)) {
      this.searchHistory.unshift(this.city);
    }

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: () => {
        this.errorMessage = 'No results found for "' + this.city + '"';
      }
    });
  }

  removeFromHistory(index: number) {
    this.searchHistory.splice(index, 1);
  }

  searchFromHistory(city: string) {
    this.city = city;
    this.getWeather();
  }
}
