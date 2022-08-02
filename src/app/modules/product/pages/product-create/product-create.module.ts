import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { AsyncButtonModule } from '@shared/directives/async-button/async-button.module';

const routes: Routes = [

  {
    path: '',
    component: ProductCreateComponent
  }

]

@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgPipesModule,
    AsyncButtonModule
  ],
  exports: [RouterModule]
})
export class ProductCreateModule { }
