import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { CalendarService } from "./calendar.service";
import { Calendar } from "./calendar.model";
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

declare var $:any;

@Component({
    selector: 'app-calendar-create',
    templateUrl: './calendar-create.component.html',
    host:{'style':'width:100%'}
})



export class CalendarCreateComponent implements OnInit {

    calendar: Calendar;
    model;
    duration = {hour: 1, minute: 0};
    preptime = {hour: 0, minute: 0};
    finishtime = {hour: 0, minute: 0};

    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    starttime = {hour: 8, minute: 0};
    meridian = true;
  
    public editor;
    public editorContent = ``;
    // public editorOptions = {
    //     placeholder: "insert content..."
    // };

    public editorConfig = {
        placeholder: "note...",
        modules: {
          toolbar: '#toolbar'
        }
    };

    toggleMeridian() {
       this.meridian = !this.meridian;
    }
    

    constructor(private calendarService: CalendarService) {}

    onSubmit(form: NgForm) {
        if (this.calendar) {
            // Edit
            this.calendar.description = form.value.description;
            this.calendarService.updateCalendar(this.calendar)
                .subscribe(
                    result => console.log(result)
                );
            this.calendar = null;
        } else {
            // Create
            const calendar = new Calendar(form.value.description, 'Max');
            this.calendarService.createCalendar(calendar)
                .subscribe(
                    data => console.log(data),
                    // error => console.error(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.calendar = null;
        form.resetForm();
    }

    ngOnInit() {
        this.calendarService.calendarIsEdit.subscribe(
            (calendar: Calendar) => this.calendar = calendar
        );


       this.myOptions = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
        ];

    }
     
    onEditorBlured(quill) {
        console.log('editor blur!', quill);
    }

    onEditorFocused(quill) {
        console.log('editor focus!', quill);
    }

    onEditorCreated(quill) {
        this.editor = quill;
        console.log('quill is ready! this is current quill instance object', quill);
    }

    onContentChanged({ quill, html, text }) {
        console.log('quill content is changed!', quill, html, text);
    }

    onChange() {
        console.log(this.optionsModel);
    }
    
    toggle_prov(p)
    {
        $("#prov_link_"+p).toggleClass('active');
        $("#prov_"+p).prop('checked', $("#prov_link_"+p).hasClass('active'));
        $("#ico_"+p).toggleClass('active');
    }  

}