import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  constructor(
    private firestore: Firestore
  ) { }

  getDoc(collectionName:string,documentId:string){
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    return docData(docRef);
  }

  async setDoc(collectionName:string,documentId:string,documentData:object){
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    return await setDoc(docRef, documentData);
  }

  async deleteDoc(collectionName:string,documentId:string){
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    return await deleteDoc(docRef);
  }

  getCollection(collectionName:string) {
    const photosCollectionRef = collection(this.firestore,`${collectionName}/`);
    return collectionData(photosCollectionRef);
  }
}
