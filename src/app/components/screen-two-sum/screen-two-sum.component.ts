import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-screen-two-sum',
  templateUrl: './screen-two-sum.component.html',
  styleUrls: ['./screen-two-sum.component.css']
})
export class ScreenTwoSumComponent implements OnInit {

  constructor(private _fireStore:FirestoreService,private _sanitizer: DomSanitizer) { }
  donation:Donation;
  project:Project;
  category1Donations:Donation[];
  category2Donations:Donation[];
  category3Donations:Donation[];
  category4Donations:Donation[];
  
  numCat;
  transformY;
  x='$';

  ngOnInit() {            
    this._fireStore.getCurrentDonation()
    .subscribe((donation)=>{
      this.donation=donation;
    });
    this._fireStore.getCurrentProject()
    .subscribe((project)=>{
      this.project=project;
      if(this.project.categories.length===3){
        this.numCat=4;
        this.transformY='-35%';
      }else if(this.project.categories.length===4){
        this.numCat=3;
        this.transformY='-40%';
      }else if(this.project.categories.length===2){
        this.numCat=6;
        this.transformY='-20%';
      }else{
        this.numCat=6;
        this.transformY='-20%';
      }
      this.filterCategory(this.project.categories,this.donation.category);
      this._fireStore.getCategoryDonations(this.project.id,'1').subscribe((donations)=>{
        this.category1Donations=donations;
    });
    this._fireStore.getCategoryDonations(this.project.id,'2').subscribe((donations)=>{
        this.category2Donations=donations;
    });
    this._fireStore.getCategoryDonations(this.project.id,'3').subscribe((donations)=>{
        this.category3Donations=donations;
    });
    this._fireStore.getCategoryDonations(this.project.id,'4').subscribe((donations)=>{
        this.category4Donations=donations;        
    });
    });    
    
  }

  categorySelected;
  filterCategory(categories,currentCategoryId){
      this.categorySelected=categories.filter(t=>t.id == currentCategoryId);      
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

}
