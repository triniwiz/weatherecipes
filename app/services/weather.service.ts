/**
 * Created by Osei Fortune on 6/5/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import geolocation = require("nativescript-geolocation");
import * as dialogs from 'ui/dialogs';
import app = require('application');
import {Observable} from 'rxjs/Rx';
let api = 'http://192.168.2.5:3000';
@Injectable()
export class WeatherService {
    constructor(private http: Http) {

    }

    getLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!geolocation.isEnabled()) {
                geolocation.enableLocationRequest();
            } else {
                const location = geolocation.getCurrentLocation({timeout: 20000 })
                    .then((loc) => {
                        resolve(loc);
                    }, (e) => {
                        reject(e);
                    })
            }
        });
    }

    getForcast(lat, long): Observable<any> {
        return this.http.get(`${api}/api/weather/forecast?latitude=${lat}&longitude=${long}`)
            .map((res) => {
                const data = res.json();
                return data.results.channel;
            })
            .catch(e => {
                return Observable.throw(e.message);
            })
    }
    getBackGround(){
        //4 = Nature
        return this.http.get(`${api}/api/images/random/4`)
            .map((res) => {
               return res.json();
            })
            .catch(e => {
                return Observable.throw(e.message);
            })
    }
}