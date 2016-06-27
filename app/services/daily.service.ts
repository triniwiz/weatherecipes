import {Injectable} from '@angular/core';
import {Couchbase} from "nativescript-couchbase";
@Injectable()
export class DailyService{
    db;
    rows:Array<any>;
    hasData;
    weather:any;
    constructor(){
                this.db = new Couchbase("weatherecipes");
        this.db.createView("daily", "1", function (document, emitter) {
            emitter.emit(document._id, document);
        });
        this.rows = this.db.executeQuery("daily");
        if (this.rows.length > 0) {
            this.weather = this.rows.reduce((item) => {
                let data;
                if (item._id === 'server_data') {
                    data = item;
                } else {
                    data = null;
                }
                return data;
            });

            this.hasData = Boolean(this.weather);
        }
    }
    load(){
 this.weather = this.rows.reduce((item) => {
                let data;
                if (item._id === 'server_data') {
                    data = item;
                } else {
                    data = null;
                }
                return data;
            });
    }
}