import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from '../icon-list.model';

@Component({
  selector: 'app-icon-details',
  templateUrl: './icon-details.component.html',
  styleUrls: ['./icon-details.component.less'],
})
export class IconDetailsComponent {
  @Input() public showDetails: boolean;
  @Input() public icon: Icon;
  @Output() public closeDetails = new EventEmitter();

  public close(): void {
    this.closeDetails.emit();
  }
}
