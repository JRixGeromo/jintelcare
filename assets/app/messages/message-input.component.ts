import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts  } from 'angular-2-dropdown-multiselect';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    message: Message;
    messages: Message[];


    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 15,
        displayAllSelectedText: true
    };


    // Default selection 
    optionsModel: number[] = [1, 2];
    myOptions: IMultiSelectOption[];

    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
 
        if (this.message) {
            // Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            // Create
            const message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    // error => console.error(error)
                );
        }
        


        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                    
                    var stringArr = []; 
                    messages.forEach(element => {
                    let client = {
                                id : element.messageId, 
                                name : element.content, 
                                }
                    
                    stringArr.push(client);                  
                    });

                    this.myOptions = stringArr;

                    

                }
            );
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

    onChange() {
        console.log(this.optionsModel);
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );


        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                    
                    var stringArr = []; 
                    messages.forEach(element => {
                    let client = {
                                id : element.messageId, 
                                name : element.content, 
                                }
                    
                    stringArr.push(client);                  
                    });

                    this.myOptions = stringArr;

                    

                }
            );

        


        // this.myOptions = [
        // { id: 1, name: 'Option 1' },
        // { id: 2, name: 'Option 2' },
        // { id: 3, name: 'Option 3' },
        // { id: 4, name: 'Option 4' },
        // { id: 5, name: 'Option 5' },
        // { id: 6, name: 'Option 6' },
        // { id: 7, name: 'Option 7' },
        // ];

    }
}