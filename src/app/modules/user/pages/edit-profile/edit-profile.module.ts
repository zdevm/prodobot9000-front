import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValidationClassesModule } from '@shared/directives/control-validation-classes/control-validation-classes.module';


const routes: Routes = [
  { path: '', component: EditProfileComponent }
]

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ControlValidationClassesModule
  ],
  exports: [RouterModule]
})
export class EditProfileModule { }
