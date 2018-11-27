import { Component, ViewContainerRef, ElementRef } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'html-reference',
    template: `<div></div>`
})

export class HTMLReferenceComponent {

    constructor(public elementRef: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

}
