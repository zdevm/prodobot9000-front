import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsUserGuard } from '@shared/guards/is-user/is-user.guard';

const routes: Routes  = [
  {
    path: 'profile',
    loadChildren: () => import('@modules/user/pages/view-profile/view-profile.module').then(m => m.ViewProfileModule),
    canActivate: [IsUserGuard]
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
