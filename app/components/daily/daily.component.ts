import {Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, Input } from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {EventData} from 'data/observable';
import * as customPipe from '../../pipes/custom.pipe';
import platform = require('platform');
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import {Page} from 'ui/page';
import {View} from 'ui/core/view';
import settings = require("application-settings");
import config = require("../../config");
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
    rowHeight;
    viewIndex;
    @Input() daily;
    @Input() backgroundImage;
    constructor(private fonticon: TNSFontIconService, private page: Page) {
        this.viewIndex = 2;
        if (platform.device.os === 'Android') {
            this.rowHeight = 46;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 48;
        } else {
            this.rowHeight = 50;
        }
    }
    ngOnInit() { }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    loaded(event: EventData) { }
    unloaded(event: EventData) { }
    load() { }
}