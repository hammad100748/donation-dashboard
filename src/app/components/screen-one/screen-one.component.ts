import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-screen-one',
  templateUrl: './screen-one.component.html',
  styleUrls: ['./screen-one.component.css']
})
export class ScreenOneComponent implements OnInit {

  constructor(private _fireStore:FirestoreService,
              private spinnerService:Ng4LoadingSpinnerService,
              private _sanitizer: DomSanitizer) { }
  donation:Donation={
    amount:0,
    name:''
  };
  
  project:Project;
  ngOnInit() {
        
    this.spinnerService.hide();
    this._fireStore.getCurrentDonation()
    .subscribe((donation)=>{
      if(donation){
        this.donation=donation;
        console.log(this.donation);      
      }
    });
    this._fireStore.getCurrentProject()
    .subscribe((project)=>{
      this.project=project;                  
    });
  }
  

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
}


}
