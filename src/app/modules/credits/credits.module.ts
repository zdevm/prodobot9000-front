import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsComponent } from './credits.component';
import { NgObjectPipesModule } from 'ngx-pipes';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CreditsComponent }
]

@NgModule({
  declarations: [
    CreditsComponent
  ],
  imports: [
    CommonModule,
    NgObjectPipesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CreditsModule { }
