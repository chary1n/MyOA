import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[groups]'
})
export class GroupsDirective{
    constructor (el:ElementRef){
        el.nativeElement.style.backgroundColor = 'green';
    }
}