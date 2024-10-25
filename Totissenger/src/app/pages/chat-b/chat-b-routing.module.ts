import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatBPage } from './chat-b.page';

const routes: Routes = [
  {
    path: '',
    component: ChatBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBPageRoutingModule {}
