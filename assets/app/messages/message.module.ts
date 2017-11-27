import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MessagesComponent } from "./messages.component";
import { MessageListComponent } from "./message-list.component";
import { MessageComponent } from "./message.component";
import { MessageInputComponent } from "./message-input.component";
import { MessageService } from "./message.service";

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MultiselectDropdownModule,
        AngularFontAwesomeModule


    ],
    providers: [MessageService]
})
export class MessageModule {

}