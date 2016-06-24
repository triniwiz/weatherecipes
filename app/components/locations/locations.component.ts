import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {Page} from 'ui/page';
import {GestureTypes, SwipeGestureEventData} from 'ui/gestures';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import { BehaviorSubject, Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
var couchbaseModule = require("nativescript-couchbase");
import platform = require('platform');
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
    // locations: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    @ViewChild("main") main: ElementRef;
    constructor(private page: Page, private router: Router) {
        this.db = new couchbaseModule.Couchbase("weatherecipes");
        /*this.db.createView("locations", "1", function (document, emitter) {
            emitter.emit(JSON.parse(document)._id, document);
        });*/
    }
    ngOnInit() {
        /*      var rows = this.db.executeQuery("locations");
              for (var i in rows) {
                  if (rows.hasOwnProperty(i)) {
                      console.dump(rows[i])
                      // this.locations.next(JSON.parse(rows[i]))
                  }
              }*/
        // console.dump(this.locations)
    }
    ngOnDestroy() {

    }
    ngAfterViewInit() {

    }
}