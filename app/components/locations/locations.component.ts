import {Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Page} from 'ui/page';
import {GestureTypes, SwipeGestureEventData} from 'ui/gestures';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import { BehaviorSubject, Observable, Observer} from 'rxjs/Rx';
import {Router} from '@angular/router';
import platform = require('platform');
import * as customPipe from '../../pipes/custom.pipe';
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import settings = require("application-settings");
import {ItemEventData} from 'ui/list-view';
import moment = require("moment");
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import {EventData} from 'data/observable';
import {View} from 'ui/core/view';
import config = require("../../config");
import * as Batch from 'nativescript-batch';
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

    @Input() locations: Array<any>;
    @Input() backgroundImage;
    rowHeight: number;
    viewIndex;
    @Input() selected;
    @ViewChild("main") main: ElementRef;
    constructor(private page: Page, private router: Router) {
        this.viewIndex = 2;
        if (platform.device.os === 'Android') {
            this.rowHeight = 48;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 50;
        } else {
            this.rowHeight = 52;
        }
    }
    ngOnInit() { }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    selectItem(args) {
        if (args && args.place_id) {
            settings.setString(config.SELECTED_LOCATION, args);
            settings.setString(config.SELECTED_ID, args.place_id);
            settings.setBoolean(config.AUTO_LOCATION, false);
        } else {
            settings.setBoolean(config.AUTO_LOCATION, true);
            settings.setString(config.SELECTED_ID, "auto_location");
        }

    }

    loaded(event: EventData) { }
    unloaded(event: EventData) { }
}