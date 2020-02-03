import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})

export class AutofocusDirective implements OnInit {

    @Input('appAutofocus') autofocus: boolean;

    constructor(
        private elementRef: ElementRef
    ) { }

    setAutoFocus(condition: boolean) {
        if (condition) {
            this.elementRef.nativeElement.focus();
        }
    }

    ngOnInit() {
        this.setAutoFocus(this.autofocus);
    }
}
