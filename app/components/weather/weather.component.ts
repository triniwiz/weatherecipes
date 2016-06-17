/**
 * Created by Osei Fortune on 6/4/16.
 */
import platform = require('platform');
import geolocation = require("nativescript-geolocation");
import {Component, OnInit, OnDestroy, ElementRef, ViewChild, Pipe, PipeTransform, AfterViewInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {ForecastComponent} from './forecast/forecast';
import {WindDirectionPipe} from '../../pipes/windDirection';
import {TemperaturePipe} from '../../pipes/temperature.pipe'
import {View} from 'ui/core/view';
import {TimeFromNowPipe} from '../../pipes/timeFromNow.pipe';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {LocationsComponent} from '../locations/locations.component';
import {SettingsComponent} from '../settings/settings.component';
import {DBService} from '../../services/db.service';
import {LowTemperaturePipe} from '../../pipes/lowtemp.pipe';
import {HighTemperaturePipe} from '../../pipes/hightemp.pipe';
import {WeatherPipe} from '../../pipes/weathericon.pipe';
import {TimePipe} from '../../pipes/time.pipe';
import {SpeedConverterPipe, PrecipitationConverterPipe} from '../../pipes/converter.pipe';
import {SwipeGestureEventData, GestureTypes} from 'ui/gestures';
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
var couchbaseModule = require("nativescript-couchbase");
declare var zonedCallback: Function;
@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe,
        WindDirectionPipe,
        TimePipe,
        TimeFromNowPipe,
        TemperaturePipe,
        LowTemperaturePipe,
        HighTemperaturePipe,
        WeatherPipe,
        SpeedConverterPipe,
        PrecipitationConverterPipe],
    styleUrls: [
        'components/weather/weather-common.css',
        'components/weather/weather.css'
    ],
    directives: [ForecastComponent]
})
export class WeatherComponent implements OnInit, OnDestroy, AfterViewInit {
    weather;
    isLoading;
    bg;
    interval;
    currentTime;
    refreshing;
    location;
    backgroundImage;
    photos;
    database;
    rows;
    weatherData;
    hasData;
    @ViewChild("direction") direction: ElementRef;
    @ViewChild("main") main: ElementRef;
    constructor(private dbService: DBService, private router: Router, private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) {
        this.database = new couchbaseModule.Couchbase("weatherecipes");
        this.weatherData;
        this.hasData = false;
        this.database.createView("weather", "1", function (document, emitter) {
            emitter.emit(document._id, document);
        });
        this.rows = this.database.executeQuery("weather");
        if (this.rows.length > 0) {
            this.weatherData = this.rows[0];
            this.hasData = true;
        }



    }

    ngOnInit() {
        this.refreshing = false;
        this.page.actionBarHidden = true;
        this.load();
        this.interval = setInterval(() => {
            this.currentTime = this.weatherService.getTime();
        }, 1000);
    }

    swipe(args) {
        console.dump(args)
    }
    ngAfterViewInit() {
        /*this.main.nativeElement.on("", (args: SwipeGestureEventData) => {
            console.dump(args)
        })*/
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
                        console.log(`Second Load error: ${JSON.stringify(error)}`);

                        if (this.hasData) {
                            this.location = this.weatherData.location;
                            this.backgroundImage = this.weatherData.photo;
                            this.weather = this.weatherData.weather;
                        }

                    })
            })
    }
    loadForecast(loc): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weatherService.getForcast(loc)
                .subscribe((data) => {
                    this.location = data[0];
                    this.photos = data[2].photos;
                    const photo = this.photos.photo[Math.floor(Math.random() * this.photos.total)];
                    this.backgroundImage = `${photo.url_m}`.replace(flickrRegex, 'https://c1');
                    this.weather = data[1];
                    if (this.hasData) {
                        this.dbService.deleteDoc(this.weatherData._id).then(() => {
                            const serverReponse = {
                                weather: this.weather,
                                location: this.location,
                                photo: photo
                            }
                            this.dbService.createDoc(serverReponse);
                        })
                    } else {
                        const serverReponse = {
                            weather: this.weather,
                            location: this.location,
                            photo: photo
                        }
                        this.dbService.createDoc(serverReponse);
                    }
                    resolve(data);
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

}


