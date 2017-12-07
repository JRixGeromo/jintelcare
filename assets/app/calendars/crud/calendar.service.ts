import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Calendar } from "./calendar.model";
import { ErrorService } from "../../errors/error.service";

@Injectable()
export class CalendarService {
    private calendars: Calendar[] = [];
    calendarIsEdit = new EventEmitter<Calendar>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    createCalendar(calendar: Calendar) {
        const body = JSON.stringify(calendar);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        //return this.http.post('https://jintelcare.herokuapp.com/calendar/create-schedule/' + token, body, {headers: headers})
        return this.http.post('http://localhost:3000/calendar/create-schedule/' + token, body, {headers: headers})
              .map((response: Response) => {
                const result = response.json();
                const calendar = new Calendar(
                    result.obj.description,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.calendars.push(calendar);
                return calendar;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getCalendars() {
        //return this.http.get('https://jintelcare.herokuapp.com/calendar/list-schedules')
        return this.http.get('http://localhost:3000/calendar/list-schedules')
        
            .map((response: Response) => {
                const calendars = response.json().obj;
                let transformedCalendars: Calendar[] = [];    
                for (let calendar of calendars) {
                    transformedCalendars.push(new Calendar(
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

    editCalendar(calendar: Calendar) {
        this.calendarIsEdit.emit(calendar);
    }

    updateCalendar(calendar: Calendar) {
        const body = JSON.stringify(calendar);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        //return this.http.patch('https://jintelcare.herokuapp.com/calendar/update-schedule/' + calendar.calendarId + token, body, {headers: headers})
        return this.http.patch('http://localhost:3000/calendar/update-schedule/' + calendar.calendarId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteCalendar(calendar: Calendar) {
        this.calendars.splice(this.calendars.indexOf(calendar), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        //return this.http.delete('https://jintelcare.herokuapp.com/calendar/delete-schedule/' + calendar.calendarId + token)
        return this.http.delete('http://localhost:3000/calendar/delete-schedule/' + calendar.calendarId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}