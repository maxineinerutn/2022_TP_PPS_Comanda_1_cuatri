import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth:AuthService,private router:Router,private usuarios:UsuariosService) {
    defineCustomElements(window);
  }

  async asdasd()
  {

  }
  hola(){

  }
  test(){
    alert("dsfds");
  }
}
