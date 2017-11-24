import { Component, Input } from "@angular/core";

import { Daily } from "./daily.model";
import { DailyService } from "./daily.service";

@Component({
    selector: 'app-daily-schedules',
    templateUrl: './daily.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class DailyComponent {
    @Input() calendar: Daily;

    constructor(private calendarService: DailyService) {}

   
}