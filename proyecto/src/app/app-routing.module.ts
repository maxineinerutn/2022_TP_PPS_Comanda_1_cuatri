import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../app/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'splash',
    component: SplashScreenComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  ,
  {
    path: 'login',
    component: HomePage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
