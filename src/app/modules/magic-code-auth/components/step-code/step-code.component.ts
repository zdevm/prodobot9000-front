import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'step-code',
  templateUrl: './step-code.component.html',
  styleUrls: ['./step-code.component.scss']
})
export class StepCodeComponent implements OnInit {
  @Output() submittedForm = new EventEmitter<{ code: string }>();
  @Input() remainingSeconds$!: Observable<number>;
  showRemainingTime = false;
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      code: [null, [Validators.required, Validators.pattern(/^\d+$/)]]
    })
  }

  ngOnInit(): void {
    if (!this.remainingSeconds$) {
      throw new Error('Cannot continue without remaining seconds input!');
    }
    this.remainingSeconds$.subscribe(this.updateDom)
  }

  onSubmit() {
    const code = this.form.get('code')!.value;
    this.submittedForm.emit({code: code.toString()});
  }

  private updateDom(seconds: number) {
    const secondsElem = document.getElementById('seconds');
    const minutesElem = document.getElementById('minutes');
    if (!secondsElem || !minutesElem) {
      this.showRemainingTime = false;
      throw new Error('Failed to find seconds and minutes elements in DOM');
    }
    minutesElem.innerText = Math.floor(seconds / 60).toString().padStart(2, '0');
    secondsElem.innerText = Math.floor(seconds % 60).toString().padStart(2, '0');
    this.showRemainingTime = true;
  }

}
