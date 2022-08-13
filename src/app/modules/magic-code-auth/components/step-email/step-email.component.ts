import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'step-email',
  templateUrl: './step-email.component.html',
  styleUrls: ['./step-email.component.scss']
})
export class StepEmailComponent implements OnInit {
  @Output() submittedForm = new EventEmitter<{ email: string }>();
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.submittedForm.emit(this.form.value);
  }

}
