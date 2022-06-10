import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
// import { Usuario } from '../clases/usuario.model';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
// import { authFireService } from '../services/authFireModule.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  cargando: boolean = false;
  subscripcion;
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Email requerido.' 
      },
      { 
        type: 'pattern', 
        message: 'Email invalido.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Contraseña requerida.' 
      },
      { 
        type: 'minlength', 
        message: 'Minimo 6 caracteres.' 
      }
    ]
  };

  constructor(
    private router: Router,
    // private authFireService: authFireService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });

  }

  ionViewWillEnter(){
    this.userForm.reset();
  }

  signIn(value) {
    // this.cargando=true;
    // setTimeout(()=>{
    //   this.subscripcion = this.authFireService.signinUser(value)
    //   .then((response) => {
    //     this.errorMsg = "";
    //     this.cargando = false;
    //     this.router.navigateByUrl('/registrados');
    //   }, error => {
    //     this.cargando = false;
    //     this.presentToastWithOptions();
    //   })
    // },2000)
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

  loginAdmin(){
    this.userForm.setValue({email:'admin@admin.com', password:'123456'});
  }
  loginTester(){
    this.userForm.setValue({email:'tester@tester.com', password:'123456'});
  }
  loginMartin(){
    this.userForm.setValue({email:'martin6@hotmail.com', password:'123456'});
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'ERROR',
      message: 'Usuario o contraseña incorrecto, intente de nuevo',
      icon: 'close-circle',
      position: 'top',
      color:'danger',
      buttons: [
         {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
  }
}
