import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradient';

@Directive({
  selector: '[Gradient]',
})
export class GradientDirective {

  @Input() gradientConfiguration!: IGradientConfiguration;

  private timerId!: number;

  private defaultConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['transparent'],
    thickness: '2px'
  }

  @HostBinding('class.gradient-border') isActive: boolean = false;

  @HostBinding('style.--border-width')
  get borderWidth(): string {
    if (this.isActive) {
      return this.gradientConfiguration.thickness!
    } else {
      return this.defaultConfiguration.thickness!
    }
  }

  @HostBinding('style.--gradient-colors')
  get gradientColors(): string {
    if (this.isActive) {
      return this.gradientConfiguration.colors!.join(', ');
    } else {
      return this.defaultConfiguration.colors!.join(', ');
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.timerId = setTimeout(() => {
      this.isActive = true;
    }, this.gradientConfiguration.delay ?? this.defaultConfiguration.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.timerId);
  }

}
