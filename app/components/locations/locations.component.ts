import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {Page} from 'ui/page';
import {GestureTypes, SwipeGestureEventData} from 'ui/gestures';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import { BehaviorSubject, Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {Couchbase} from "nativescript-couchbase";
import platform = require('platform');
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;

@Component({
    selector: 'locations',
    templateUrl: 'components/locations/locations.html',
    styleUrls: [
        'components/locations/locations-common.css'
    ],
    pipes: [TNSFontIconPipe]
})

export class LocationsComponent implements OnInit, AfterViewInit, OnDestroy {
    db;
    screen;
    rows: Array<any>;
    currentLocation;
    locations: Array<any>;
    hasData;
    backgroundImage;
    rowHeight;
    // locations: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    @ViewChild("main") main: ElementRef;
    constructor(private page: Page, private router: Router) {
        this.db = new Couchbase("weatherecipes");
        this.db.createView("locations", "1", function (document, emitter) {
            emitter.emit(document._id, document);
        });
        this.rows = this.db.executeQuery("locations");
        if (this.rows.length > 0) {
            this.currentLocation = this.rows.reduce((item) => {
                let data;
                if (item._id === 'server_data') {
                    data = item;
                } else {
                    data = null;
                }
                return data;
            });

            this.rows.forEach((item, index) => {
                if (item && (item.type === 'location')) {
                    this.locations.push(item);
                }
            });

            this.hasData = Boolean(this.currentLocation);
        }

        this.backgroundImage = `${this.currentLocation.photo.url_m}`.replace(flickrRegex, 'https://c1');
        if (platform.device.os === 'Android') {
            this.rowHeight = 44;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 46;
        } else {
            this.rowHeight = 48;
        }
    }
    ngOnInit() { }
    ngOnDestroy() {

    }
    ngAfterViewInit() {

    }
}