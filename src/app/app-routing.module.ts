import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { IsGuestGuard } from '@shared/guards/is-guest/is-guest.guard';
import { IsUserGuard } from '@shared/guards/is-user/is-user.guard';

const routes: Routes = [

  {
    path: 'products',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
    canActivate: [IsUserGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [IsGuestGuard]
  },
  {
    path: 'credits',
    loadChildren: () => import('./modules/credits/credits.module').then(m => m.CreditsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
