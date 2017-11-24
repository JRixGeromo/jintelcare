import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from "@angular/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { routing } from "./app.routing";
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { MessageModule } from "./messages/message.module";
import { CalendarModule } from "./calendars/crud/calendar.module";
import { DailyModule } from "./calendars/daily/daily.module";



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        AuthenticationComponent,
        ErrorComponent

    ],
    imports: [
        BrowserModule,        
        routing,
        HttpModule,
        
        NgbModule.forRoot(),
        MessageModule,
        CalendarModule,
        DailyModule

    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}