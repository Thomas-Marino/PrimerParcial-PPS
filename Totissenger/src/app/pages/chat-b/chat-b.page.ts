import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.page.html',
  styleUrls: ['./chat-b.page.scss'],
})
export class ChatBPage implements OnInit {
  fireStoreService = inject(FirestoreService);
  fireAuthService = inject(AuthService);
  chatService = inject(ChatService);
  
  spinnerMostrandose: boolean;
  observableMensajes: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
  usuarioLogueado: string = "";

  constructor() 
  {
    this.spinnerMostrandose = true;  
    this.observableMensajes = this.chatService.ObtenerMensajes("Aula-B"); 
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  async ngOnInit(): Promise<void> {
    this.usuarioLogueado = await this.fireAuthService.ObtenerUsuario();
  }

  AlternarChat(): void 
  {
    this.chatAbierto = !this.chatAbierto;
  }

  MandarMensaje(): void 
  {
    this.chatService.GuardarMensaje(this.mensaje, "Aula-B");
    this.mensaje = "";
  }
}
