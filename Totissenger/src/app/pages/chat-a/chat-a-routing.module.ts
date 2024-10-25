import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAPage } from './chat-a.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAPageRoutingModule {}
