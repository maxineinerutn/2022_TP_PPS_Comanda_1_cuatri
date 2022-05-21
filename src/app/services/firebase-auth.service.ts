import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private auth: Auth,
  ) { }

  async login(email:string,password:string) {
    return await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async logout() {
    return await signOut(this.auth);
  }
}
