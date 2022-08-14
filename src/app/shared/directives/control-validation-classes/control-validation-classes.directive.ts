import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[validation-classes]'
})
export class ControlValidationClassesDirective implements OnDestroy, OnChanges {
  @Input('validation-classes') control?: AbstractControl;

  private unsub$ = new Subject<void>();
  private nativeElem?: HTMLElement;

  private readonly bootstrapValidClasses = ['is-valid'];
  private readonly bootstrapInvalidClasses = ['is-invalid'];

  constructor(private elemRef: ElementRef) {
    this.nativeElem = this.elemRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.nativeElem) {
      return;
    }
    const newControl = changes['control']?.currentValue
    if (newControl) {
      this.unsub();
      this.listenControlChanges(newControl);
    }
  }

  ngOnDestroy(): void {
    this.unsub();
    this.unsub$.complete();
  }

  private listenControlChanges(control: AbstractControl) {
    control.statusChanges.pipe(
      takeUntil(this.unsub$),
      distinctUntilChanged()
    ).subscribe(status => {
      if (!this.nativeElem) { // cannot be falsy
        return;
      }
      const classList = this.nativeElem.classList;
      if (status === 'VALID') {
        classList.add(...this.bootstrapValidClasses)
        classList.remove(...this.bootstrapInvalidClasses)
      } else if (status === 'INVALID' && !control.pristine) {
        classList.add(...this.bootstrapInvalidClasses);
        classList.remove(...this.bootstrapValidClasses);
      }
    })
  }

  private unsub() {
    this.unsub$.next();
  }

}
