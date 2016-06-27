import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import * as customPipe from '../../pipes/custom.pipe';
import {DailyService} from '../../services/daily.service';
import platform = require('platform');
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;

@Component({
    selector: 'daily',
    templateUrl: 'components/daily/daily.html',
    pipes: [
        TNSFontIconPipe,
        customPipe.TimePipe,
        customPipe.TemperaturePipe,
        customPipe.WeatherPipe
    ],styleUrls:['components/daily/daily.css']
})

export class DailyComponent implements OnInit, AfterViewInit, OnDestroy {
    weather;
    rowHeight;
    backgroundImage
    constructor(private fonticon: TNSFontIconService, private dailyService: DailyService) {
        this.weather = this.dailyService.weather;
        this.backgroundImage = `${this.dailyService.weather.photo.url_m}`.replace(flickrRegex, 'https://c1');
        if (platform.device.os === 'Android') {
            this.rowHeight = 44;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 46;
        } else {
            this.rowHeight = 48;
        }
    }
    ngOnInit() { }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    load() {
        this.dailyService.load();
    }
}