/**
 * Created by Osei Fortune on 6/4/16.
 */
import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {ForecastComponent} from './forecast/forecast';
@Component({
    selector: 'my-app',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe],
    styleUrls:['components/weather/weather.css'],
    directives:[ForecastComponent]
})
export class WeatherComponent implements OnInit {
    weather;
    city;
    temp;
    forecast;
    high;
    low;
    units;
    distance;
    pressure;
    speed;
    temperature;
    isLoading;
    current;
    currentForecast;
    backgroundImage;
    constructor(private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) { }
    
    ngOnInit() {
        // this.page.actionBarHidden = true;
        this.loadBG();
        this.load();
    }

    load() {
        this.weatherService.getLocation()
            .then(loc => {
                this.weatherService.getForcast(loc.latitude, loc.longitude)
                    .subscribe(
                    (res) => {
                        this.weather = res;
                        this.current = this.weather.item;
                        this.forecast = this.weather.item.forecast;
                        this.currentForecast = this.weather.item.forecast[0];
                    },
                    err => { console.log(err.message) }
                    )
            })
            .catch(e => {
                console.log(e.message)
            })
    }
    loadBG(){
        this.weatherService.getBackGround()
            .subscribe(
                (res:any) =>{this.backgroundImage = res.urls.regular}
                ,err =>{console.log(err.message)}
            );
    }
}


