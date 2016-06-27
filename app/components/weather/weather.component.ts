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
import moment = require("moment");
import settings = require('application-settings');
declare var zonedCallback: Function;
import {Observable} from 'rxjs/Rx';
import {CouchBaseDB} from '../../couchbase.db';
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
        customPipe.PrecipitationConverterPipe,
        customPipe.PressurePipe,
        customPipe.VisibilityPipe,
        customPipe.CloudCoverPipe],
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
    db;
    rows: Array<any>;
    weatherData;
    hasData;
    timeStamp;
    @ViewChild("direction") direction: ElementRef;
    @ViewChild("main") main: ElementRef;
    constructor(private recipesService: RecipesService, private couchInstance: CouchBaseDB, private dbService: DBService, private router: Router, private weatherService: WeatherService, private page: Page, private fonticon: TNSFontIconService) {
        this.db = this.couchInstance.getDataBase();
        this.rows = this.db.executeQuery("weatherecipes");
        this.refreshing = false;
        if (this.rows.length > 0) {


            this.weatherData = this.rows.reduce((item) => {
                if (item._id === settings.getString("selected")) {
                    return item;
                }
            })

            this.hasData = Boolean(this.weatherData);
            this.location = this.weatherData.location;
            this.weather = this.weatherData.weather;
            const photo = this.weatherData.photo;
            this.backgroundImage = photo.image_url;
            this.timeStamp = this.weatherData.timeStamp;



        }



        if (!this.timeStamp) {
            this.load();
        } else if (this.weatherData && this.weatherData._id !== settings.getString("selected")) {
            this.load();
        } else {
            let diff = moment().diff(this.timeStamp, 'minutes');
            if (diff <= 10) {
                this.load();
            }
        }
    }

    ngOnInit() {
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
                    })
            })
    }
    loadForecast(loc): Promise<any> {
        this.refreshing = true;
        return new Promise((resolve, reject) => {
            this.weatherService.getForcast(loc)
                .subscribe((data) => {
                    this.refreshing = false;
                    this.location = data[0];
                    this.photos = data[2];
                    /*const photo = this.photos.photo[Math.floor(Math.random() * this.photos.total)]; //flickr
                    this.backgroundImage = `${photo.url_m}`.replace(flickrRegex, 'https://c1');*/

                    const id = Math.floor(Math.random() * data[2].photos.length);  //500px
                    this.backgroundImage = data[2].photos[id].image_url;
                    this.weather = data[1];
                    this.timeStamp = +new Date();

                    if (this.hasData) {
                        this.dbService.deleteDoc(settings.getString("selected")).then(() => {

                            const serverReponse = {
                                weather: this.weather,
                                location: this.location,
                                photo: this.photos.photos[id],
                                timeStamp: this.timeStamp
                            }

                            if (settings.getString("selected") === 'server_data') {
                                this.dbService.createDoc("server_data", serverReponse)
                                    .then((id) => {

                                        settings.setString("selected", "server_data");
                                    }).catch((e) => { console.log(e) });
                            } else {
                                this.dbService.createDoc(this.weatherData._id, serverReponse)
                                    .then((id) => {
                                        settings.setString("selected", id);
                                    }).catch((e) => { console.log(e) });
                            }
                        })
                    } else {
                        const serverReponse = {
                            weather: this.weather,
                            location: this.location,
                            photo: this.photos.photos[id],
                            timeStamp: this.timeStamp
                        }
                        if (!settings.getString("selected")) {
                            this.dbService.createDoc(serverReponse, "server_data")
                                .then((id) => {
                                    settings.setString("selected", "server_data");
                                }).catch((e) => { console.log(e) })
                        } else {
                            this.dbService.createDoc(serverReponse)
                                .then((id) => {
                                    settings.setString("selected", id);
                                }).catch((e) => { console.log(e) })
                        }
                    }
                    resolve(data);
                }, (err: any) => {
                    this.refreshing = false;
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

    findMeADrink(temp) {
        this.refreshing = true;
        const units = this.weather.flags.units;
        switch (units) {
            case "us":
                if (temp <= 32) {
                    //Too Damned Cold
                    this.showRecipe("hot");
                } else if (temp <= 41 && temp > 32) {
                    //Extremely Cold
                    this.showRecipe("hot");
                } else if (temp <= 50 && temp > 41) {
                    //Very Cold
                    this.showRecipe("hot");
                } else if (temp <= 59 && temp > 50) {
                    //Cold
                    this.showRecipe("hot");
                } else if (temp <= 68 && temp > 59) {
                    //Cool
                    this.showRecipe("cool");
                } else if (temp <= 77 && temp > 68) {
                    //Nice
                    this.showRecipe("nice");
                } else if (temp <= 86 && temp > 77) {
                    //Warm
                    this.showRecipe("cold");
                } else if (temp <= 95 && temp > 86) {
                    //Hot
                    this.showRecipe("icy");
                } else if (temp <= 104 && temp > 95) {
                    //Very Hot
                    this.showRecipe("icy");
                } else if (temp <= 113 && temp > 104) {
                    //Extremely Hot
                    this.showRecipe("icy");
                }
                break;
            case "si":
            case "ca":
            case "uk2":
                if (temp <= 0) {
                    //Too Damned Cold
                    this.showRecipe("hot");
                } else if (temp <= 5 && temp > 0) {
                    //Extremely Cold
                    this.showRecipe("hot");
                } else if (temp <= 10 && temp > 5) {
                    //Very Cold
                    this.showRecipe("hot");
                } else if (temp <= 15 && temp > 10) {
                    //Cold
                    this.showRecipe("hot");
                } else if (temp <= 20 && temp > 15) {
                    //Cool
                    this.showRecipe("cool");
                } else if (temp <= 25 && temp > 20) {
                    //Nice
                    this.showRecipe("nice");
                } else if (temp <= 30 && temp > 25) {
                    //Warm
                    this.showRecipe("cold");
                } else if (temp <= 35 && temp > 30) {
                    //Hot
                    this.showRecipe("icy");
                } else if (temp <= 40 && temp > 35) {
                    //Very Hot
                    this.showRecipe("icy");
                } else if (temp <= 45 && temp > 40) {
                    //Extremely Hot
                    this.showRecipe("icy");
                }
                break;
        }





    }
    loaded() {

    }
    showRecipe(params) {
        this.recipesService.getDrinks(params)
            .subscribe(
            (res: any) => {
                const spoonRegex = /(https:)(\/\/)/g;
                var items = res.baseUri.replace(spoonRegex, "").split("/");
                let random = Math.floor(Math.random() * res.results.length)
                this.router.navigate(["/recipes", res.results[random].id, res.results[random].title, items[0], items[1], res.results[random].image, res.results[random].readyInMinutes]);
                this.refreshing = false;
            },
            e => {
                console.log(e)
                this.refreshing = false;
            }
            )
    }

}


