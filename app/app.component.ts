/**
 * Created by Osei Fortune on 6/4/16.
 */
import {Component} from '@angular/core';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CouchBaseDB} from './couchbase.db'
@Component({
    selector: 'my-app',
    template: '<page-router-outlet></page-router-outlet>',
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AppComponent {
        constructor(couchbaseInstance: CouchBaseDB) {
        couchbaseInstance.init();
    }
 }
