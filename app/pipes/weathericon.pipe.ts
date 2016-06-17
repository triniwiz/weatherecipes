import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'weathericon'
})

export class WeatherPipe implements PipeTransform {
    transform(value) {
        if (value) {
            if (value === 'clear-day') {
                return 'wi-forecast-io-clear-day'
            } else if (value === 'clear-night') {
                return 'wi-forecast-io-clear-night'
            } else if (value === 'rain') {
                return 'wi-forecast-io-rain'
            } else if (value === 'snow') {
                return 'wi-forecast-io-snow'
            } else if (value === 'sleet') {
                return 'wi-forecast-io-sleet'
            } else if (value === 'strong-wind') {
                return 'wi-forecast-io-wind'
            } else if (value === 'fog') {
                return 'wi-forecast-io-fog'
            } else if (value === 'cloudy') {
                return 'wi-forecast-io-cloudy'
            } else if (value === 'partly-cloudy-day') {
                return 'wi-forecast-io-partly-cloudy-day'
            } else if (value === 'partly-cloudy-night') {
                return 'wi-forecast-io-partly-cloudy-night'
            } else if (value === 'hail') {
                return 'wi-forecast-io-hail'
            } else if (value === 'thunderstorm') {
                return 'wi-forecast-io-thunderstorm'
            } else if (value === 'tornado') {
                return 'wi-forecast-io-tornado'
            }

        }
    }
}