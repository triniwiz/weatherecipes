import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {Page} from 'ui/page';
import {SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData} from 'ui/segmented-bar';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
@Component({
    selector: 'tabs',
    templateUrl: 'components/tabs/tabs.html',
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TNSFontIconPipe],
    styleUrls:['components/tabs/tabs.css']
})
export class TabsComponent implements OnInit, OnDestroy, AfterViewInit {
    selectedIndex: number;
    items: Array<any>;
    selectedText: number;
    @ViewChild("tabs") tabs: ElementRef;
    constructor(private router: Router, private page: Page, private fonticon: TNSFontIconService) { }
    ngOnInit() {
        this.items = [{ title: 'Currently' }, { title: 'Daily' }, { title: 'Locations' }];
        this.page.actionBarHidden = true;
    }
    ngAfterViewInit() { }
    ngOnDestroy() { }
    selectedIndexChanged(event: SelectedIndexChangedEventData) {
        switch (event.newIndex) {
            case 0:
                this.router.navigate(["/"]);
                break;
            case 1:
                this.router.navigate(["/daily"]);
                break;
            case 2:
                this.router.navigate(["/locations"]);
                break;
        }

    }
}