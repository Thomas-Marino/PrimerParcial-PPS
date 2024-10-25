import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage
{
  authService = inject(AuthService);
  userService = inject(UserService);
  imgService = inject(ImagenesService);

  usuario: string = "";
  constructor() {}


  
}
