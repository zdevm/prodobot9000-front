import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'new',
    loadChildren: () => import('./pages/product-create/product-create.module').then(m => m.ProductCreateModule)
  },

  {
    path: '', // view product
    loadChildren: () => import('./pages/view-product/view-product.module').then(m => m.ViewProductModule)
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductModule { }
