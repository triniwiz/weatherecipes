import {Injectable} from '@angular/core';
import {Couchbase} from "nativescript-couchbase";
@Injectable()
export class LocationsService {
    db;
    screen;
    rows: Array<any>;
    currentLocation;
    locations: Array<any>;
    hasData;
    constructor() {
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
                    this.locations = [...item];
                }
            });

            this.hasData = Boolean(this.currentLocation);
        }
    }
    load() {
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
                this.locations = [...item];
            }
        });
    }
}