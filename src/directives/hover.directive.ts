import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 'normal';
  }

}
