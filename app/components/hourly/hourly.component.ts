import {Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, Pipe, PipeTransform, AfterViewInit} from '@angular/core';
import * as customPipe from '../../pipes/custom.pipe';
import settings = require("application-settings");
import {ItemEventData} from 'ui/list-view';
import moment = require("moment");
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import {EventData} from 'data/observable';
import {View} from 'ui/core/view';
import platform = require("platform");
import config = require("../../config");
import * as Batch from 'nativescript-batch';
@Component({
    selector: 'hourly',
    templateUrl: 'components/hourly/hourly.html',
    styleUrls: ['components/hourly/hourly-common.css', 'components/hourly/hourly.css'],
    pipes: [customPipe.TemperaturePipe, customPipe.WeatherPipe, customPipe.TimePipe, TNSFontIconPipe]
})
export class HourlyComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() backgroundImage;
    viewIndex;
    rowHeight;
    @Input() hourly;
    constructor(private fonticon: TNSFontIconService) {
        this.viewIndex = 1;
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
    load() {}
    loaded(event: EventData) {}
    unloaded(event: EventData) {}

}