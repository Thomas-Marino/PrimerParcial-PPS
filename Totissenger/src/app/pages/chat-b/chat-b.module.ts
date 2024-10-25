import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatBPageRoutingModule } from './chat-b-routing.module';

import { ChatBPage } from './chat-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBPageRoutingModule
  ],
  declarations: [ChatBPage]
})
export class ChatBPageModule {}
