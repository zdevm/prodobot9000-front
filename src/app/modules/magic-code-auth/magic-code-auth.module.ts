import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicCodeAuthComponent } from './magic-code-auth.component';
import { StepEmailComponent } from './components/step-email/step-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepCodeComponent } from './components/step-code/step-code.component';



@NgModule({
  declarations: [
    MagicCodeAuthComponent,
    StepEmailComponent,
    StepCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MagicCodeAuthComponent]
})
export class MagicCodeAuthModule { }
