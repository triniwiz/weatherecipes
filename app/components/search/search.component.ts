import {Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChange, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {NSLocationStrategy} from 'nativescript-angular/router/ns-location-strategy';
import {Page} from 'ui/page';
import {Observable, PropertyChangeData} from 'data/observable'
import * as customPipe from '../../pipes/custom.pipe';
import {SearchService} from '../../services/search.service';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import platform = require('platform');
import {SearchBar} from 'ui/search-bar';
import {ItemEventData} from 'ui/list-view';
import settings = require("application-settings");
import config = require("../../config");
import dialog = require("ui/dialogs")
@Component({
    selector: 'search',
    templateUrl: 'components/search/search.html',
    styleUrls: ['components/search/search-common.css', 'components/search/search.css'],
    pipes: [TNSFontIconPipe]
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
    query: string;
    searching: boolean;
    list: Array<any>;
    rowHeight: number;
    saving: boolean;
    @ViewChild("searchBar") searchBar: ElementRef;
    constructor(private locationStrategy: NSLocationStrategy, private page: Page, private router: Router, private fonticon: TNSFontIconService, private searchService: SearchService) {
        this.query = "";
        this.list = [];
        this.saving = false;
        if (platform.device.os === 'Android') {
            this.rowHeight = 44;
        } else if (platform.device.os === 'IOS') {
            this.rowHeight = 46;
        } else {
            this.rowHeight = 48;
        }
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }
    ngAfterViewInit() {
        if (platform.device.os === 'Android') {
            const searchbar: SearchBar = this.searchBar.nativeElement;
        }

    }
    ngOnDestroy() { }
    goBack() {
        this.locationStrategy.back();
    }
    queryUpdate(data: string) {
        if (data.length > 0) {
            console.log(data)
        }
    }
    search() {
        this.searchService.search(this.query)
            .subscribe(
            res => { this.list = [...res]; },
            e => { console.log(e) }
            )
    }
    clear() {
        this.query = '';
        this.list.splice(0);
    }
    itemSelected(args: ItemEventData) {
        this.saving = true;
        this.searchService.addLocation(args.view.bindingContext)
            .subscribe(
            res => {

                const location = res[0];
                const weather = res[1];
                const photos = res[2];
                const id = Math.floor(Math.random() * photos.photos.length);
                const photo = photos.photos[id]

                let saved_locations: Array<any> = JSON.parse(settings.getString(config.SAVED_LOCATIONS));
                console.log(settings.getString(config.SAVED_LOCATIONS))
                if (saved_locations.length > 0) {
                    let exists = saved_locations.reduce((item) => {
                        if (location.place_id === item.place_id) {
                            return item;
                        }
                    });

                    if (!exists) {
                        const arr = saved_locations.splice(0).push({ place_id: location.place_id, lat: location.lat, lon: location.lon, address: location.address });
                        settings.setString(config.SELECTED_LOCATION, JSON.stringify({ place_id: location.place_id, lat: location.lat, lon: location.lon, address: location.address }))
                        settings.setString(config.SAVED_LOCATIONS, JSON.stringify(arr));
                        settings.setString(config.WEATHER, JSON.stringify(weather));
                        settings.setString(config.PHOTOS, JSON.stringify(photos));
                        settings.setString(config.PHOTO, JSON.stringify(photo));
                        this.locationStrategy.back();
                        this.saving = false;
                    } else {
                        this.saving = false;
                        dialog.alert({ title: 'Try again', message: "Location exist in user's list already" })
                    }
                } else {
                    const arr = saved_locations.splice(0).push({ place_id: location.place_id, lat: location.lat, lon: location.lon, address: location.address });
                    settings.setString(config.SELECTED_LOCATION, JSON.stringify({ place_id: location.place_id, lat: location.lat, lon: location.lon, address: location.address }))
                    settings.setString(config.SAVED_LOCATIONS, JSON.stringify(arr));
                    settings.setString(config.WEATHER, JSON.stringify(weather));
                    settings.setString(config.PHOTOS, JSON.stringify(photos));
                    settings.setString(config.PHOTO, JSON.stringify(photo));
                    this.locationStrategy.back();
                    this.saving = false;
                }




            },
            e => {
                this.saving = false;
                console.log(e)
            }
            )
    }
}