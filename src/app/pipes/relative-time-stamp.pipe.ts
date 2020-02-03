import { Pipe, PipeTransform } from '@angular/core';
declare const InstallTrigger: any;

@Pipe({
    name: 'relativeTimeStamp'
})

export class RelativeTimeStampPipe implements PipeTransform {

    getDateWithLocaleTimeZone(date) {
        if (!date || !date.length || date.length === 0) {
            if (!isNaN(date)) {
                return new Date(date);
            } else {
                return '';
            }
        }

        if (false || !!window.document['documentMode']) {
            // Check if browser is IE
            return new Date(date);
        } else if (!(false || !!window.document['documentMode']) && !!window['StyleMedia']) {
            // Check if browser is Edge
            return new Date(date);
        } else if (!!window['chrome'] && !!window['chrome'].webstore) {
            // Check if browser is Chrome
            return new Date(date);
        } else if (typeof InstallTrigger !== 'undefined') {
            // Check if browser is Firefox
            const dtObj = new Date(date);
            dtObj.setMinutes(dtObj.getMinutes() - dtObj.getTimezoneOffset());
            return dtObj;
        } else if (/constructor/i.test(window['HTMLElement'].toString()) || ((p) => {
            // Check if browser is Safari
            return p.toString() === '[object SafariRemoteNotification]';
        })(!window['safari'])) {
            return new Date(date);
        } else if ((!!window['opr']) || !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0) {
            // Check if browser is opera
            return new Date(date);
        } else {
            // Check if any other browser
            return new Date(date);
        }
    }

    transform(value: any, ...args: any[]): any {
        let isoStringToLocale: any = '';
        if (value !== undefined && value !== '') {
            const currentDate = new Date();
            isoStringToLocale = this.getDateWithLocaleTimeZone(value);

            if (currentDate.toLocaleDateString() === isoStringToLocale.toLocaleDateString()) {
                // check if today
                isoStringToLocale = isoStringToLocale.toLocaleString(navigator.language,
                    {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    }).toLocaleUpperCase();
            } else if (isoStringToLocale.toLocaleDateString() === new Date(Date.now() - 86400000).toLocaleDateString()) {
                // check if yesterday
                isoStringToLocale = 'Yesterday';
            } else {
                // days other than today and yesterday
                isoStringToLocale = isoStringToLocale.toLocaleString(navigator.language,
                    {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                    });
            }

            return isoStringToLocale;
        }

        return '';
    }
}
