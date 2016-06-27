import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Page} from 'ui/page';
import {GestureTypes, SwipeGestureEventData} from 'ui/gestures';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import { BehaviorSubject, Observable, Observer} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {Couchbase} from "nativescript-couchbase";
import platform = require('platform');
import * as customPipe from '../../pipes/custom.pipe';
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import settings = require("application-settings");
import {ItemEventData} from 'ui/list-view';
import moment = require("moment");
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import {EventData} from 'data/observable';
import {View} from 'ui/core/view';
import {CouchBaseDB} from '../../couchbase.db';
@Component({
    selector: 'locations',
    templateUrl: 'components/locations/locations.html',
    styleUrls: [
        'components/locations/locations-common.css', 'components/locations/locations.css'
    ],
    pipes: [TNSFontIconPipe, customPipe.TemperaturePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LocationsComponent implements OnInit, AfterViewInit, OnDestroy {
    db;
    screen;
    rows: Array<any>;
    gpsLocation: any;
    locations: Array<any>;
    hasData;
    backgroundImage;
    rowHeight: number;
    isSelected;
    viewIndex;
    weather;
    // locations: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    @ViewChild("main") main: ElementRef;
    constructor(private page: Page, private router: Router, private couchInstance: CouchBaseDB) {
        this.hasData = false;
        this.db = this.couchInstance.getDataBase();
        this.viewIndex = 2;
        this.isSelected = settings.getString("selected");
        this.rows = this.db.executeQuery("weatherecipes");
        if (platform.device.os === 'Android') {
            this.rowHeight = 48;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 50;
        } else {
            this.rowHeight = 52;
        }

        this.load();

    }
    ngOnInit() {

        /* if (!this.gpsLocation) {
             this.load();
         } else if (settings.getString("selected") !== global.weatherData._id) {
             this.load();
         } else {
             let diff = moment().diff(this.gpsLocation.timeStamp, 'minutes');
             if (diff <= 10) {
                 this.load();
             }
         }*/
    }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    load() {
        if (this.rows.length > 0) {
            // this.backgroundImage = this.gpsLocation.photo.image_url;
            this.locations = this.rows.filter((item) => {
                if (item._id !== 'server_data') {
                    return item;
                }
            });

            this.weather = this.rows.reduce((item) => {
                if (item._id === settings.getString("selected")) {
                    return item;
                }
            });

            this.backgroundImage = this.weather.photo.image_url;
            this.gpsLocation = this.rows.reduce((item) => {
                if (item._id === 'server_data') {
                    return;
                }
            })


            /*this.backgroundImage = `${this.currentLocation.photo.url_m}`.replace(flickrRegex, 'https://c1');*/ //flickr
        }
    }
    selectItem(args) {
        if (args && args._id) {
            settings.setString("selected", args._id);
            this.isSelected = settings.getString("selected");
        }

    }

    loaded(event: EventData) { }
    unloaded(event: EventData) { }
}