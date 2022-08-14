import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsUserGuard } from '@shared/guards/is-user/is-user.guard';
import { IsGuestGuard } from '@shared/guards/is-guest/is-guest.guard';

const routes: Routes  = [
  {
    path: 'profile',
    loadChildren: () => import('@modules/user/pages/view-profile/view-profile.module').then(m => m.ViewProfileModule),
    canActivate: [IsUserGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('@modules/user/pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [IsGuestGuard]
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
export class UserModule { }
