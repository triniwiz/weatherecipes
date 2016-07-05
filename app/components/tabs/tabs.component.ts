import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {Page} from 'ui/page';
import {SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData} from 'ui/segmented-bar';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {WeatherComponent} from '../../components/weather/weather.component';
import {LocationsComponent} from '../../components/locations/locations.component';
import {DailyComponent} from '../../components/daily/daily.component';
import {HourlyComponent} from '../../components/hourly/hourly.component';
import {TabView} from 'ui/tab-view';
import {Color} from 'color';
import {View} from 'ui/core/view';
import settings = require('application-settings');
import config = require('../../config');
import * as Batch from 'nativescript-batch';
import {TabsService} from '../../services/tabs.service';
import geolocation = require("nativescript-geolocation");
declare var zonedCallback: Function;
import {Button} from 'ui/button';
import {Label} from 'ui/label';
@Component({
    selector: 'tabs',
    templateUrl: 'components/tabs/tabs.html',
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES, WeatherComponent, DailyComponent, LocationsComponent, HourlyComponent],
    pipes: [TNSFontIconPipe],
    styleUrls: ['components/tabs/tabs.css']
})
export class TabsComponent implements OnInit, OnDestroy, AfterViewInit {
    selectedIndex: number;
    items: Array<any>;
    selectedText: number;
    backgroundImage: string;
    daily;
    hasData;
    location;
    locations;
    hourly;
    weather;
    timeStamp;
    interval;
    currentTime;
    refreshing;
    loading;
    photos;
    selected;
    @ViewChild("refresh") refresh: ElementRef;
    @ViewChild("tabview") tabview: ElementRef;
    constructor(private router: Router, private page: Page, private fonticon: TNSFontIconService, private route: ActivatedRoute, private tabsService: TabsService) {
    }
    ngOnInit() {
        this.items = [{ title: 'Current' }, { title: 'Hourly' }, { title: 'Daily' }, { title: 'Locations' }];
        this.init();
    }
    ngAfterViewInit() {
        const tabview: TabView = this.tabview.nativeElement;
    }
    ngOnDestroy() {

        /* if (this.interval) {
             clearInterval(this.interval)
         }*/

    }
    selectedIndexChanged(event: SelectedIndexChangedEventData) {
        this.selectedIndex = event.newIndex;
    }
    goToSearch() {
        this.router.navigate(["/search"]);
    }
    init() {
        this.loading = true;
        if (settings.getString(config.SELECTED_LOCATION)) {
            this.selected = settings.getString(config.SELECTED_ID);
            const loc = JSON.parse(settings.getString(config.SELECTED_LOCATION));
            this.loadForecast({ longitude: loc.lon, latitude: loc.lat })
                .then(() => {
                    this.loading = false;
                }).catch(() => {
                    console.log('error')
                    this.loading = false;
                })
        } else {
            this.load();
        }
    }
    load() {
        this.loading = true;
        this.tabsService.getLocation()
            .then((loc: any) => {
                this.loadForecast(loc)
                    .then((res) => {
                        this.selected = settings.getString(config.AUTO_LOCATION);
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                        console.log(`First Load error: ${JSON.stringify(error)}`)
                    })
            })
            .catch((e: any) => {
                this.loadForecast(geolocation.LocationMonitor.getLastKnownLocation())
                    .then((res) => {
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                        console.log(`Second Load error: ${JSON.stringify(error)}`);
                    })
            })
    }
    loadForecast(loc): Promise<any> {
        return new Promise((resolve, reject) => {
            this.tabsService.getForcast(loc)
                .subscribe((data) => {
                    this.location = data[0];
                    this.photos = data[2];
                    const id = Math.floor(Math.random() * data[2].photos.length);
                    this.backgroundImage = data[2].photos[id].image_url;
                    this.weather = data[1];
                    //this.timeStamp = this.weather.currently.time;
                    this.timeStamp = +new Date();
                    this.hourly = this.weather.hourly;
                    this.daily = this.weather.daily;

                    let b = Batch.newBatch((ctx: Batch.IBatchOperationContext) => {
                        settings.setString(config.SELECTED_LOCATION, JSON.stringify({ place_id: this.location.place_id, lat: this.location.lat, lon: this.location.lon, address: this.location.address }))
                        settings.setString(config.WEATHER, JSON.stringify(this.weather));
                        settings.setString(config.WEATHER_HOURLY, JSON.stringify(this.weather.hourly));
                        settings.setString(config.WEATHER_DAILY, JSON.stringify(this.weather.daily));
                        settings.setString(config.PHOTOS, JSON.stringify(this.photos));
                        settings.setString(config.PHOTO, JSON.stringify(this.backgroundImage));
                        settings.setString(config.SAVED_LOCATIONS, JSON.stringify([]));
                        ctx.checkIfFinished();
                    }).whenAllFinished((ctx: Batch.IBatchOperationContext) => {
                        resolve();
                    });
                    b.start();

                }, (err: any) => {
                    reject(err);
                })
        });
    }

    loaded(event) { }
    refreshWeather() {
        const refreshButton = <Button>this.refresh.nativeElement;
        const animation = refreshButton.createAnimation({
            rotate: 360,
            iterations: Number.POSITIVE_INFINITY,
            duration: 1000,
        });
        animation.play();
        this.refreshing = true;
        global.refreshing = true;
        if (settings.getString(config.SELECTED_LOCATION)) {
            this.selected = settings.getString(config.SELECTED_ID);
            const loc = JSON.parse(settings.getString(config.SELECTED_LOCATION));
            this.loadForecast({ longitude: loc.lon, latitude: loc.lat })
                .then((data) => {
                    this.refreshing = false;
                    global.refreshing = false;
                    animation.cancel();
                }).catch((e) => {
                    console.log(e)
                    this.refreshing = false;
                    global.refreshing = false;
                    animation.cancel();
                })
        } else {
            this.tabsService.getLocation()
                .then((loc: any) => {
                    this.loadForecast(loc)
                        .then((res) => {
                            this.selected = settings.getString(config.AUTO_LOCATION);
                            this.refreshing = false;
                            global.refreshing = false;
                            animation.cancel();
                        })
                        .catch((error) => {
                            console.log(`First Load error: ${JSON.stringify(error)}`);
                            this.refreshing = false;
                            global.refreshing = false;
                            animation.cancel();
                        })
                })
                .catch((e: any) => {
                    this.loadForecast(geolocation.LocationMonitor.getLastKnownLocation())
                        .then((res) => {
                            this.refreshing = false;
                            global.refreshing = false;
                            animation.cancel();
                        })
                        .catch((error) => {
                            console.log(`Second Load error: ${JSON.stringify(error)}`);
                            this.refreshing = false;
                            global.refreshing = false;
                            animation.cancel();
                        })
                })
        }
    }
}