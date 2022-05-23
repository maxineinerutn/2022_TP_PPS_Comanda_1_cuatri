import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {

  constructor(private animationController: AnimationController,
    private router: Router) { }


  async ionViewDidEnter(){
    SplashScreen.hide();
    const animation = this.animationController
    .create()
    .addElement(document.querySelector('#xx'))
    .duration(2000)
    .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');
    await animation.play();
    this.router.navigateByUrl('login');
  }
  ngOnInit() {
  }

}
