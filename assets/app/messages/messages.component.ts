import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    host:{'style':'width:100%'},
    template: `
        
            <app-message-input></app-message-input>
        
        <hr>
        
            <app-message-list></app-message-list>
        
    `
})
export class MessagesComponent {

}