import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from './my-products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStringPipesModule } from 'ngx-pipes';
import { FileIdToUrlModule } from '@shared/pipes/file-id-to-url/file-id-to-url.module';

const routes: Routes = [

  {
    path: '',
    component: MyProductsComponent
  }

]

@NgModule({
  declarations: [
    MyProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgStringPipesModule,
    FileIdToUrlModule
  ],
  exports: [RouterModule]
})
export class MyProductsModule { }
