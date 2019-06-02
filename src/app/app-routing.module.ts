import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { CircleComponent } from './circle/circle.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item',
        component: ItemComponent
      },
      {
        path: 'circle',
        component: CircleComponent,
        outlet: 'aux'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
