import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupProviderComponent } from './setup-provider.component';
import { ProviderFormModule } from '@modules/rate-provider/components/provider-form/provider-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncButtonModule } from '@shared/directives/async-button/async-button.module';



@NgModule({
  declarations: [
    SetupProviderComponent
  ],
  imports: [
    CommonModule,
    ProviderFormModule,
    ReactiveFormsModule,
    AsyncButtonModule
  ],
  exports: [SetupProviderComponent]
})
export class SetupProviderModule { }
