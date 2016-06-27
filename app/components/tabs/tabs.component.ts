import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {Page} from 'ui/page';
import {SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData} from 'ui/segmented-bar';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {WeatherComponent} from '../../components/weather/weather.component';
import {LocationsComponent} from '../../components/locations/locations.component';
import {DailyComponent} from '../../components/daily/daily.component';
import {TabView} from 'ui/tab-view';
import {Color} from 'color';
@Component({
    selector: 'tabs',
    templateUrl: 'components/tabs/tabs.html',
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES, WeatherComponent, DailyComponent, LocationsComponent],
    pipes: [TNSFontIconPipe],
    styleUrls: ['components/tabs/tabs.css']
})
export class TabsComponent implements OnInit, OnDestroy, AfterViewInit {
    selectedIndex: number;
    items: Array<any>;
    selectedText: number;
    backgroundImage;
    daily;
    hasData;
    location;
    weather;
    timeStamp;
    @ViewChild("tabview") tabview: ElementRef;
    constructor(private router: Router, private page: Page, private fonticon: TNSFontIconService, private route: ActivatedRoute) {}
    ngOnInit() {
        this.items = [{ title: 'Currently' }, { title: 'Daily' }, { title: 'Locations' }];
        /*this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.contactsService
                    .getContact(id)
                    .subscribe(contact => this.contact = contact);
            });*/

    }
    ngAfterViewInit() {
        const tabview: TabView = this.tabview.nativeElement;
    }
    ngOnDestroy() { }
    selectedIndexChanged(event: SelectedIndexChangedEventData) {
        this.selectedIndex = event.newIndex;
    }
    goToSearch() {
        this.router.navigate(["/search"]);
    }
}