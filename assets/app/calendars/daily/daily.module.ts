import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SchedulesComponent } from "./schedules.component";
import { DailyComponent } from "./daily.component";
import { DailyService } from "./daily.service";

@NgModule({
    declarations: [
        SchedulesComponent,
        DailyComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [DailyService]
})
export class DailyModule {

}