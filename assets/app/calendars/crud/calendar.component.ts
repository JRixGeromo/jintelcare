import { Component, Input } from "@angular/core";

import { Calendar } from "./calendar.model";
import { CalendarService } from "./calendar.service";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    host:{'style':'width:100%'},
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
export class CalendarComponent {
    @Input() calendar: Calendar;

    constructor(private calendarService: CalendarService) {}

    onEdit() {
        this.calendarService.editCalendar(this.calendar);
    }

    onDelete() {
        this.calendarService.deleteCalendar(this.calendar)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.calendar.userId;
    }
}