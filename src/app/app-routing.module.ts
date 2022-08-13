import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'products',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
