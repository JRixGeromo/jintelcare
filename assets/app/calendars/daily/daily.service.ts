import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Daily } from "./daily.model";
import { ErrorService } from "../../errors/error.service";

@Injectable()
export class DailyService {
    private calendars: Daily[] = [];
    calendarIsEdit = new EventEmitter<Daily>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    getDaily() {
        //return this.http.get('https://jintelcare.herokuapp.com/calendar/list-schedules')
        return this.http.get('http://localhost:3000/calendar/daily-schedules')
        
            .map((response: Response) => {
                const calendars = response.json().obj;
                let transformedCalendars: Daily[] = [];    
                for (let calendar of calendars) {
                    transformedCalendars.push(new Daily(
                        calendar.description,
                        calendar.user.firstName,
                        calendar._id,
                        calendar.user._id)
                    );
                }
                this.calendars = transformedCalendars;
                return transformedCalendars;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}