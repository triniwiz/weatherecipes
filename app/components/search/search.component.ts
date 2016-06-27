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
import {DBService} from '../../services/db.service';
import settings = require("application-settings");
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
    constructor(private locationStrategy: NSLocationStrategy, private page: Page, private dbService: DBService, private router: Router, private fonticon: TNSFontIconService, private searchService: SearchService) {
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
        //let data = (Object).assign({ type: 'location' }, args.view.bindingContext);
        this.searchService.addLocation(args.view.bindingContext)
            .subscribe(
            res => {

                const location = res[0];
                const weather = res[1];
                const photos = res[2];
                /*const photo = this.photos.photo[Math.floor(Math.random() * this.photos.total)]; //flickr
                this.backgroundImage = `${photo.url_m}`.replace(flickrRegex, 'https://c1');*/

                const id = Math.floor(Math.random() * photos.photos.length);  //500px                
                const timeStamp = +new Date();

                const serverReponse = {
                    weather: weather,
                    location: location,
                    photo: photos.photos[id],
                    timeStamp: timeStamp,
                }

                this.dbService.createDoc(serverReponse)
                    .then((id) => {
                        settings.setString("selected", id);
                        this.locationStrategy.back();
                        this.saving = false;
                    })
                    .catch((e) => {
                        this.saving = false;
                        console.log(e)
                    })
            },
            e => {
                this.saving = false;
                console.log(e)
            }
            )
        /*this*/
    }
}