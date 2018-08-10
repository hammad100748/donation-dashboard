import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _fireStore:FirestoreService,
              private _router: Router,
              private spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.hide();
    if(localStorage.getItem('user')){
      this._router.navigate(['/home']);
    }
  }

  login(values){
    this.spinnerService.show();
    this._fireStore.login(values.email,values.password)
    .then((docRef)=>{
      console.log(docRef.uid);
      localStorage.setItem('user',docRef.uid);
      this._router.navigate(['/home']);
    }).catch((err)=>{
      console.log(err);
      this.spinnerService.hide();
    });
  }

}
