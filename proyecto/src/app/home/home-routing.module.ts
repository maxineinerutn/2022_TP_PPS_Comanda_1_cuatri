import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
  },
  {
    path:'login',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
