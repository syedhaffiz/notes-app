import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appSearchHighlight]'
})

export class SearchHighlightDirective implements OnChanges {
    @Input() searchText: string[];
    @Input() text: string;
    @Input() classToApply: string;

    constructor(
        private el: ElementRef, private renderer: Renderer2
    ) { }

    getFormattedText() {
        const re = new RegExp(`(${this.searchText})`, 'g');

        return this.text.replace(re, `<span class="${this.classToApply}">$1</span>`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.searchText || !this.searchText.length || !this.classToApply) {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
            return;
        }
        console.log('Highlight directive');

        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedText());
    }

}
