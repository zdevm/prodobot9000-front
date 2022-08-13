import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { NgStringPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgStringPipesModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
