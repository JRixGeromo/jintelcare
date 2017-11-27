import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { CalendarService } from "./calendar.service";
import { Calendar } from "./calendar.model";
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts  } from 'angular-2-dropdown-multiselect';
//import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from '../../../../node_modules/angular-2-dropdown-multiselect';

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

    /////


     
    // Default selection 
    optionsModel: number[] = [1, 2];
     
    // Settings configuration 
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 10,
        displayAllSelectedText: true
    };
     
    // Text configuration 
    myTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        defaultTitle: 'Select',
        allSelected: 'All selected',
    };
     
    // Labels / Parents 
    myOptions: IMultiSelectOption[] = [
        { id: 1, name: 'Car brands', isLabel: true },
        { id: 2, name: 'Volvo', parentId: 1 },
        { id: 3, name: 'Honda', parentId: 1 },
        { id: 4, name: 'BMW', parentId: 1 },
        { id: 5, name: 'Colors', isLabel: true },
        { id: 6, name: 'Blue', parentId: 5 },
        { id: 7, name: 'Red', parentId: 5 },
        { id: 8, name: 'White', parentId: 5 }
    ];

    /////
    //myOptions: IMultiSelectOption[];
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