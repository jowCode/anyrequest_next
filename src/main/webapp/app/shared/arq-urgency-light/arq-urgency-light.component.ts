import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-urgency-light',
  templateUrl: 'arq-urgency-light.component.html',
  styleUrls: ['arq-urgency-light.scss']
})
export class ArqUrgencyLightComponent {
  public currentClassName = 'empty-urgency';

  constructor() {}

  getClassName(urgency: string): string {
    let className: string;
    if (urgency === 'LOW') {
      className = 'urgency-low blink-slow';
    } else if (urgency === 'MEDIUM') {
      className = 'urgency-medium blink-med';
    } else if (urgency === 'HIGH') {
      className = 'urgency-high blink-fast';
    } else {
      className = 'empty-urgency';
    }
    return className;
  }

  @Input()
  set urgencyToCheck(urgency: string) {
    if (urgency) {
      this.currentClassName = this.getClassName(urgency);
    }
  }
}
