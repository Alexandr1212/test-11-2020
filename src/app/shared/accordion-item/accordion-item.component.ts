import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.less'],
})
export class AccordionItemComponent {
  @ViewChild('accordionItemBtn') public accordionItemBtn: ElementRef;

  @Input() opened = false;
  @Input() title: string;

  public toggle() {
    this.accordionItemBtn.nativeElement.classList.toggle(
      'accordion-item__btn--opened'
    );
    return (this.opened = !this.opened);
  }
}
