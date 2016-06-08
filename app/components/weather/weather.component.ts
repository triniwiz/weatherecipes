/**
 * Created by Osei Fortune on 6/4/16.
 */
import {Component, OnInit,OnDestroy,ElementRef,ViewChild} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {ForecastComponent} from './forecast/forecast';
import {WindDirectionPipe} from '../../pipes/windDirection';
import {View} from 'ui/core/view';
import platform = require('platform');
@Component({
    selector: 'my-app',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe,WindDirectionPipe],
    styleUrls: [
        'components/weather/weather-common.css',
        'components/weather/weather.css'
    ],
    directives:[ForecastComponent]
})
export class WeatherComponent implements OnInit,OnDestroy {
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
    interval;
    currentTime;
    middleRow;
    @ViewChild("direction") direction: ElementRef;

    constructor(private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) { }

    ngOnInit() {
        this.middleRow = `*,${platform.screen.mainScreen.heightDIPs},auto`; 
        this.page.actionBarHidden = true;
        this.loadBG();
        this.load();
        this.interval = setInterval(()=>{
            this.currentTime = this.weatherService.getTime();
        },1000);
    }

    ngOnDestroy(){
        if(this.interval) {
            clearInterval(this.interval)
        }
    }
    load() {
        this.weatherService.getLocation()
            .then((loc:any) => {
                this.weatherService.getForcast(loc.latitude, loc.longitude)
                    .subscribe((res) => {
                        this.weather = res;
                        this.current = this.weather.item;
                        this.forecast = this.weather.item.forecast;
                        this.currentForecast = this.weather.item.forecast[0];
                    }, (err:any) => {
                        console.log(err);
                        for (let key in err) {
                            console.log(key);
                        }
                    })
            })
            .catch((e:any) => {
                console.log(e.message)
            })
    }
    loadBG(){
        this.weatherService.getBackGround()
            .subscribe((res: any) => {
                this.backgroundImage = res.urls.regular
            }, (err: any) => {
                console.log(err);
                for (let key in err) {
                    console.log(key);
                }
            });
    }
}


