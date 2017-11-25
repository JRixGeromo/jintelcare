import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'angular2-ui-switch'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarsComponent } from "./calendars.component";
import { CalendarComponent } from "./calendar.component";
import { CalendarCreateComponent } from "./calendar-create.component";
import { CalendarService } from "./calendar.service";

//import { CKEditorModule } from 'ng2-ckeditor';
//import { TinymceModule } from 'angular2-tinymce';
import { QuillEditorModule } from 'ngx-quill-editor';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
    declarations: [
        CalendarsComponent,
        CalendarComponent,        
        CalendarCreateComponent,
 
    ],
    imports: [
        CommonModule,
        FormsModule,
        //CKEditorModule,
        MultiselectDropdownModule,
        UiSwitchModule,
        ReactiveFormsModule,
        NgbModule,
        QuillEditorModule,
        AngularFontAwesomeModule

        //TinymceModule
    ],
    providers: [CalendarService]
})
export class CalendarModule {

}