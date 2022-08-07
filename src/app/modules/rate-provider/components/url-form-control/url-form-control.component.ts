import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { EnvService } from '@shared/services/env/env.service';
import { validate } from 'validate.js';

@Component({
  selector: 'provider-url-form-control',
  templateUrl: './url-form-control.component.html',
  styleUrls: ['./url-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UrlFormControlComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UrlFormControlComponent
    }
  ]
})
export class UrlFormControlComponent implements ControlValueAccessor, Validator  {

  public constructor(private envConfig: EnvService) { }

  @Input() placeholder = '';
  
  value = '';
  isDisabled = false;
  status: 'untouched' | 'valid' | 'invalid' = 'untouched';
  readonly invalidErrorMessage = $localize`Input is not a valid url`;
  

  // callback
  onChange = (val: string) => {};
  onTouched = () => {};

  setValue(v: string) {
    this.value = v;

    this.onChange(v);
    this.onTouched();
  }

  inputOnChange(e: Event) {
    const v = (<any>e).target.value;
    this.setValue(v);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.pristine && !control.value) {
      this.status = 'untouched';
      return null;
    }
    const validationOptions = {
      url: {
        url: {
          allowLocal: this.envConfig.get('production') ? false : true
        },
      }
    }
    const isValidUrl = validate({url:control.value}, validationOptions);
    if (!isValidUrl) { // returns no errors
      this.status = 'valid';
      return null;
    }
    this.status = 'invalid';
    return { url: this.invalidErrorMessage };
  }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

}
