import { Injectable } from '@angular/core';
@Injectable()
export class Calendar {
    public selectedDay = new Date()
    public selectedObject
    public eventSource = []
    public viewTitle;
    public isToday: boolean;
    public calendarModes = [
        { key: 'month', value: 'Month' },
        { key: 'week', value: 'Week' },
        { key: 'day', value: 'Day' },
    ];
    public calendar = {
        mode: this.calendarModes[0].key,
        currentDate: new Date()
    }; // these are the variable used by the calendar.
    constructor() {

        // this.markDisabled(new Date(2017, 12, 25))
    }

    loadEvents() {
        //this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        this.selectedObject = ev
        // this.openActionSheet(ev)
    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();

        this.selectedDay = event

    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return (date < current);
    };

    blockDayEvent(date) {
        let startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

        let endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

        let events = this.eventSource;
        events.push({
        title: 'All Day ',
        startTime: startTime,
        endTime: endTime,
        allDay: true
        });
        this.eventSource = [];
        setTimeout(() => {
        this.eventSource = events;
        });
    }

    onOptionSelected($event: any) {
        console.log($event)
        //this.calendar.mode = $event
    }
}