import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private animationController: AnimationController,
    private router: Router) { }


  async ionViewDidEnter(){
    SplashScreen.hide();
    const animation = this.animationController
    .create()
    .addElement(document.querySelector('#container'))
    .duration(2000)
    .fromTo('opacity', '1', '0');
    await animation.play();
    this.router.navigateByUrl('home');
  }
}
