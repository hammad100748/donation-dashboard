import { Injectable } from '@angular/core';
import { AngularFireAuth, } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { Router } from '@angular/router';
import { Project } from '../interfaces/project';
import { Donation } from '../interfaces/donation';

@Injectable()
export class FirestoreService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private _router: Router) {

  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.removeCurrentProject().then((docRef) => {
        this.removeCurrentDonation().then((docRef) => {
          localStorage.clear();
          this._router.navigate(['/']);
        });
      });
    });
  }

  simpleLogout(){
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      this._router.navigate(['/']);
    });
  }

  addProject(project: Project) {
    return this.afs.collection('projects').add(project);
  }

  updateProject(project: Project) {
    return this.afs.collection('projects').doc(project.id).update(project);
  }

  updateCurrentProject(project: Project) {
    return this.afs.collection('current').doc('project').set(project);
  }

  getCurrentProject() {
    return this.afs.collection('current').doc('project').valueChanges();
  }

  getCurrentProjectById(project_id) {
    return this.afs.collection('projects').doc(project_id).valueChanges();
  }

  getAllProjects() {
    return this.afs.collection('projects', ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  addDonation(projectId, donation: Donation) {
    return this.afs.collection('projects').doc(projectId).collection('donations').add(donation);
  }

  updateCurrentDisplayDonation(donation: Donation) {
    return this.afs.collection('current').doc('donation').set(donation);
  }

  updateCurrentDisplayProject(project: Project) {
    return this.afs.collection('current').doc('project').set(project);
  }

  getCurrentDonation() {
    return this.afs.collection('current').doc('donation').valueChanges();
  }

  getCategoryDonations(project_id, cat) {
    return this.afs.collection('projects').doc(project_id).collection('donations', ref => ref.where('category', '==', cat).orderBy('createdAt', 'desc').limit(9)).valueChanges();
  }

  getAllDonations(project_id) {
    return this.afs.collection('projects').doc(project_id).collection('donations')
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Donation;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  removeCurrentDonation() {
    return this.afs.collection('current').doc('donation').delete();
  }

  removeCurrentProject() {
    return this.afs.collection('current').doc('project').delete();
  }

  updateDonation(projectId,donation:Donation){
    return this.afs.collection('projects').doc(projectId).collection('donations').doc(donation.id).set(donation);    
  }

  deleteDonation(projectId,donationId){
    return this.afs.collection('projects').doc(projectId).collection('donations').doc(donationId).delete();
  }

}
