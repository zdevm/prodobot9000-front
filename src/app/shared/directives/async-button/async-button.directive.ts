import { Attribute, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

type ThemeUnion = 'dark' | 'light' | 'primary' | 'secondary' | 'info' | 'warning';

@Directive({
  selector: '[async-btn]'
})
export class AsyncButtonDirective implements OnChanges {
  @Input() disabled: boolean = false;
  @Input('async-btn-is-busy') isLoading = true;
  private el: HTMLButtonElement;
  private spinnerElem!: HTMLDivElement;

  constructor(elementRef: ElementRef,
              private renderer: Renderer2,
              @Attribute('async-btn-theme') private theme: ThemeUnion = 'light') {
    this.el = elementRef.nativeElement;
  }

  private enableBtn() {
    if (this.spinnerElem) {
      this.renderer.removeChild(this.el, this.spinnerElem);
    }
    if (this.disabled) {
      return;
    }
    this.el.disabled = false;
  }

  private disableBtn() {
    this.spinnerElem = this.createSpinnerElem(this.theme);
    this.renderer.appendChild(this.el, this.spinnerElem);
    this.el.disabled = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      if (changes['isLoading'].currentValue === true) {
        this.disableBtn();
      } else {
        this.enableBtn();
      }
    }
    if (changes['disabled']) {
      this.el.disabled = changes['disabled'].currentValue;
    }
  }

  private createSpinnerElem(theme: ThemeUnion) {
    const elem = document.createElement("div");
    elem.classList.add('spinner-border', 'spinner-border-sm', `text-${theme}`);
    elem.setAttribute('role', 'status');
    elem.innerHTML = `<span class="visually-hidden">Loading...</span>`;
    return elem;
  }

}
