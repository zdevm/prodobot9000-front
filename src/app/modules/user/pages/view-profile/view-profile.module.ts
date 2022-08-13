import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ViewProfileComponent }
]

@NgModule({
  declarations: [
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewProfileModule { }
