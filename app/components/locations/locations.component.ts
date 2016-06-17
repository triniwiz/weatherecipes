import {Component, OnInit} from '@angular/core';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import { BehaviorSubject} from 'rxjs/Rx';
var couchbaseModule = require("nativescript-couchbase");
import platform = require('platform');
@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/locations/locations.html',
    styleUrls: [
        'components/locations/locations-common.css'
    ],
    pipes: [TNSFontIconPipe]
})

export class LocationsComponent implements OnInit {
    db;
    screen;
    locations: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    constructor(private page: Page) {
        /*this.db = new couchbaseModule.Couchbase("weatherecipes");
        this.db.createView("locations_", "1", function (document, emitter) {
            emitter.emit(JSON.parse(document)._id, document);
        });*/
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
        /*var rows = this.db.executeQuery("people");
        for (var i in rows) {
            if (rows.hasOwnProperty(i)) {
                this.locations.next(JSON.parse(rows[i]))
            }
        }
        console.dump(this.locations)*/
    }
}