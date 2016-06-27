import {Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {EventData} from 'data/observable';
import * as customPipe from '../../pipes/custom.pipe';
import platform = require('platform');
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import {Page} from 'ui/page';
import {View} from 'ui/core/view';
import {CouchBaseDB} from '../../couchbase.db';
import settings = require("application-settings")
@Component({
    selector: 'daily',
    templateUrl: 'components/daily/daily.html',
    pipes: [
        TNSFontIconPipe,
        customPipe.TimePipe,
        customPipe.TemperaturePipe,
        customPipe.WeatherPipe
    ], styleUrls: ['components/daily/daily-common.css', 'components/daily/daily.css']
})

export class DailyComponent implements OnInit, AfterViewInit, OnDestroy {
    weather;
    rowHeight;
    rows: Array<any>;
    hasData;
    viewIndex;
    loading;
    daily;
    backgroundImage;
    db;
    constructor(private fonticon: TNSFontIconService, private page: Page, private couchInstance: CouchBaseDB) {
        this.viewIndex = 1;
        this.db = this.couchInstance.getDataBase();
        this.rows = this.db.executeQuery("weatherecipes");

        if (platform.device.os === 'Android') {
            this.rowHeight = 44;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 46;
        } else {
            this.rowHeight = 48;
        }
        this.load()
        this.hasData = false;
    }
    ngOnInit() { }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    loaded(event: EventData) { }
    unloaded(event: EventData) { }
    load() {
        if (this.rows.length > 0) {
            this.weather = this.rows.reduce((item) => {
                if (item._id === settings.getString("selected")) {
                    return item;
                }
            })
            this.backgroundImage = this.weather.photo.image_url;

        }
    }
}