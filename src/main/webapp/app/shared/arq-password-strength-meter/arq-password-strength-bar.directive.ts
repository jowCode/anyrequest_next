import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jhiChangeClassName]'
})
export class ChangeClassNameDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @Input()
  set newCssClass(cssClass: string) {
    if (cssClass) {
      this.renderer.setValue(this.element, cssClass);
    }
  }
}
