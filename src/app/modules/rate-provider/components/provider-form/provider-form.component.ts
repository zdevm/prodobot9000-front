import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { RateProviderForm, RateProviderFormCommand } from '@modules/rate-provider/interfaces/form-options.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProviderFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProviderFormComponent
    }
  ]
})
export class ProviderFormComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input() command!: RateProviderFormCommand;
  @Input() formSchema!: RateProviderForm

  form!: FormGroup;
  private unsub$ = new Subject<void>();

  constructor() { }

  private changeFn?: any;
  private touchFn?: any;

  ngOnInit(): void {
    if (!this.command || !this.formSchema) {
      throw new Error(`Cannot initialize ProviderFormComponent without 'command' and 'formSchema'`)
    }
    this.form = this.initForm(this.formSchema);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.form) {
      return { form: $localize`Form not initiated` }
    }
    if (this.form.invalid) {
      return { form: $localize`Inner form controls are invalid` } // TODO better validation
    }
    return this.form.errors;
  }

  writeValue(formValue: any): void {
    this.form.patchValue(formValue, { emitEvent: true });
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchFn = fn;
  }

  private initForm(schema: RateProviderForm) {
    if (!schema.controls.length) {
      throw new Error('Invalid form schema');
    }
    const form = new FormGroup<any>([]);
    for (const schemaControl of schema.controls) {
      const control = new FormControl(schemaControl.default, [Validators.required]);
      form.addControl(schemaControl.name, control);
    }
    form.valueChanges.pipe(takeUntil(this.unsub$))
                     .subscribe(value => {
                        if (this.changeFn && this.touchFn) {
                          this.changeFn(value);
                          this.touchFn(value);
                        }
                     });
    return form;
  }

}
