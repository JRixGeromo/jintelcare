import { Routes, RouterModule } from "@angular/router";

import { CalendarsComponent } from "./calendars/crud/calendars.component";
import { SchedulesComponent } from "./calendars/daily/schedules.component";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/calendar/list-schedules', pathMatch: 'full' },

    // { path: '', redirectTo: '/calendar/list-schedules', pathMatch: 'full' },
    // { path: '', redirectTo: '/calendar/add-schedule', pathMatch: 'full' },
    // { path: '', redirectTo: '/calendar/update-schedule', pathMatch: 'full' },
    // { path: '', redirectTo: '/calendar/delete-schedule', pathMatch: 'full' },
 
    // { path: '', redirectTo: '/manage/list-messages', pathMatch: 'full' },
    // { path: '', redirectTo: '/manage/add-message', pathMatch: 'full' },
    // { path: '', redirectTo: '/manage/update-message', pathMatch: 'full' },
    // { path: '', redirectTo: '/manage/delete-message', pathMatch: 'full' },

    { path: 'calendar/daily-schedules', component: SchedulesComponent },

    { path: 'calendar/list-schedules', component: CalendarsComponent },
    { path: 'calendar/create-schedule', component: CalendarsComponent },
    { path: 'calendar/update-schedule', component: CalendarsComponent },
    { path: 'calendar/delete-schedule', component: CalendarsComponent },
   
    { path: 'manage/list-messages', component: MessagesComponent },
    { path: 'manage/add-message', component: MessagesComponent },
    { path: 'manage/update-message', component: MessagesComponent },
    { path: 'manage/delete-message', component: MessagesComponent },

    
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);