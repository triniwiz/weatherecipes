/**
 * Created by Osei Fortune on 6/4/16.
 */
import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {ForecastComponent} from './forecast/forecast';
import {WindDirectionPipe} from '../../pipes/windDirection';
import {View} from 'ui/core/view';
import platform = require('platform');
import geolocation = require("nativescript-geolocation");
import {TimeFromNowPipe} from '../../pipes/timeFromNow.pipe';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {LocationsComponent} from '../locations/locations.component';
import {SettingsComponent} from '../settings/settings.component';
import {DBService} from '../../services/db.service';
@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe, WindDirectionPipe, TimeFromNowPipe],
    styleUrls: [
        'components/weather/weather-common.css',
        'components/weather/weather.css'
    ],
    directives: [ForecastComponent]
})
export class WeatherComponent implements OnInit, OnDestroy {
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
    refreshing;

    @ViewChild("direction") direction: ElementRef;
    constructor(private db: DBService, private router: Router, private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) { }

    ngOnInit() {
        this.refreshing = false;
        this.middleRow = `*,${platform.screen.mainScreen.heightDIPs},auto`;
        this.page.actionBarHidden = true;
        this.loadBG();
        this.load();
        this.interval = setInterval(() => {
            this.currentTime = this.weatherService.getTime();
        }, 1000);
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    load() {
        this.weatherService.getLocation()
            .then((loc: any) => {
                this.loadForecast(loc)
                    .then((res) => {
                    })
                    .catch((error) => {
                        console.log(`First Load error: ${JSON.stringify(error)}`)
                    })
            })
            .catch((e: any) => {
                this.loadForecast(geolocation.LocationMonitor.getLastKnownLocation())
                    .then((res) => {
                    })
                    .catch((error) => {
                        console.log(`Second Load error: ${JSON.stringify(error)}`)
                    })
            })
    }
    loadBG() {
        this.weatherService.getBackGround()
            .subscribe((res: any) => {
                this.backgroundImage = res.urls.regular
            }, (err: any) => {
                console.log(err);
            });
    }
    loadForecast(loc): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weatherService.getForcast(loc.latitude, loc.longitude)
                .subscribe((res) => {
                    if (res) {
                        this.db.setLocation(res)
                            .then((data) => { console.dump(data) }, (err) => { console.log(err) })
                    }

                    this.weather = res;
                    this.current = this.weather.item;
                    this.forecast = [...this.weather.item.forecast];
                    this.currentForecast = this.weather.item.forecast[0];
                    resolve(res)
                }, (err: any) => {
                    reject(err);
                })
        });
    }

    updateWeather(view: any) {

        var pullRefresh = view;
        this.weatherService.getLocation()
            .then((loc: any) => {

                this.loadForecast(loc)
                    .then((res) => {
                        setTimeout(() => {
                            pullRefresh.refreshing = false;
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error.message);
                        pullRefresh.refreshing = false;
                    })

            })
            .catch((e: any) => {
                pullRefresh.refreshing = false;
                console.log(e.message)
            })

    }
    goToLocations() {
        this.router.navigate(['/Locations']);
    }
}


