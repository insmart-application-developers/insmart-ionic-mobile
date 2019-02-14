import { Injectable } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
@Injectable()
export class Calendar {
    constructor(
        private datePicker: DatePicker
    ){

    }
    showCalendar(){
        return this.datePicker.show({
            date: new Date(),
            minDate: new Date(),
            mode: 'date',
            todayText:'Today',
            okText:'Chọn',
            cancelText:'Hủy',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        });
    }
}