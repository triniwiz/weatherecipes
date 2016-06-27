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
import * as customPipe from '../../pipes/custom.pipe';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {LocationsComponent} from '../locations/locations.component';
import {SettingsComponent} from '../settings/settings.component';
import {DBService} from '../../services/db.service';
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import {Couchbase} from "nativescript-couchbase";
import {RecipesService} from '../../services/recipes.service';
declare var zonedCallback: Function;
@Component({
    selector: 'weather',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe,
        customPipe.WindDirectionPipe,
        customPipe.TimePipe,
        customPipe.TimeFromNowPipe,
        customPipe.FromNowPipe,
        customPipe.TemperaturePipe,
        customPipe.LowTemperaturePipe,
        customPipe.HighTemperaturePipe,
        customPipe.WeatherPipe,
        customPipe.SpeedConverterPipe,
        customPipe.PrecipitationConverterPipe],
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
    rows: Array<any>;
    weatherData;
    hasData;
    timeStamp;
    @ViewChild("direction") direction: ElementRef;
    @ViewChild("main") main: ElementRef;
    constructor(private recipesService: RecipesService, private dbService: DBService, private router: Router, private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) {
        this.rows = this.weatherService.rows;
        if (this.rows.length > 0) {
            this.weatherData = this.rows.reduce((item) => {
                let data = null;
                if (item._id === 'server_data') {
                    data = item;
                }
                return data;
            });
            this.hasData = Boolean(this.weatherData);
        }
    }

    ngOnInit() {
        if (this.hasData) {
            this.location = this.weatherData.location;
            this.weather = this.weatherData.weather;
            const photo = this.weatherData.photo;
            this.backgroundImage = `${photo.url_m}`.replace(flickrRegex, 'https://c1');
            this.timeStamp = this.weatherData.timeStamp;
        }
        this.refreshing = false;
        this.load();
        this.interval = setInterval(() => {
            this.currentTime = this.weatherService.getTime();
        }, 1000);
    }

    ngAfterViewInit() { }
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
                    this.timeStamp = +new Date();
                    if (this.hasData) {
                        this.dbService.deleteDoc(this.weatherData._id).then(() => {
                            const serverReponse = {
                                weather: this.weather,
                                location: this.location,
                                photo: photo,
                                timeStamp: this.timeStamp
                            }
                            this.dbService.createDoc(serverReponse, "server_data");
                        })
                    } else {
                        const serverReponse = {
                            weather: this.weather,
                            location: this.location,
                            photo: photo,
                            timeStamp: this.timeStamp
                        }
                        this.dbService.createDoc(serverReponse, "server_data");
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

    findMeADrink() {
        this.recipesService.getRecipes('hot')
            .subscribe(
            (res) => { console.dump(res) },
            e => { console.log(e) }
            )
    }
}


