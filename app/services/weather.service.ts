/**
 * Created by Osei Fortune on 6/5/16.
 */
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, RequestOptionsArgs} from '@angular/http';
import geolocation = require("nativescript-geolocation");
import * as dialogs from 'ui/dialogs';
import app = require('application');
import {Observable} from 'rxjs/Rx';
import moment = require('moment');
import config = require('../config');
let api = config.SERVER_API;

@Injectable()
export class WeatherService {
    constructor(private http: Http) { }

    getLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!geolocation.isEnabled()) {
                geolocation.enableLocationRequest();
            } else {
                const location = geolocation.getCurrentLocation({ timeout: 30000 })
                    .then((loc) => {

                        const location: RequestOptionsArgs = {
                            url: `${api}/api/location/address?latitude=${loc.latitude}&longitude=${loc.longitude}`,
                            method: 'GET'
                        }


                        resolve(loc);
                    }, (e) => {
                        reject(e);
                    })
            }
        });
    }

    test() {

    }
    getForcast(loc): Observable<any> {
        const location: RequestOptionsArgs = {
            url: `${api}/api/location/address?latitude=${loc.latitude}&longitude=${loc.longitude}`,
            method: 'GET'
        }
        console.log(`${api}/api/location/address?latitude=${loc.latitude}&longitude=${loc.longitude}`)
        console.dump(this.http.get(`${api}/api/location/address?latitude=${loc.latitude}&longitude=${loc.longitude}`).toPromise())
        const data = this.http.request(JSON.stringify(location)).toPromise();

        setTimeout(() => {
            console.dump(data)
            data.then((res) => {
                console.log(res);
            }).catch((e) => { console.log(e) })
        }, 4000)
        return
        /*  return Observable.forkJoin(
              this.http.get(`${api}/api/location/address?latitude=${loc.latitude}&longitude=${loc.longitude}`).map((res: Response) => { res.json(); console.dump(res); })
              , this.http.get(`${api}/api/weather/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}`).map((res: Response) => res.json()),
              this.http.get(`${api}/api/images/location?latitude=${loc.latitude}&longitude=${loc.longitude}`).map((res: Response) => res.json())
          )*/
    }
    getBackGround() {
        //4 = Nature
        return this.http.get(`${api}/api/images/random/4`)
            .map((res) => {
                return res.json();
            })
            .catch(e => {
                return Observable.throw(e);
            })
    }
    getTime() {
        return moment().format(' h:mm a');
    }

}