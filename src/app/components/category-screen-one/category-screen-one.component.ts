import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-category-screen-one',
  templateUrl: './category-screen-one.component.html',
  styleUrls: ['./category-screen-one.component.css']
})
export class CategoryScreenOneComponent implements OnInit {
  currentProject:Project;
  project:Project;
  donation:Donation;
  numCat;
  transformY;
  currentCategory;
  constructor(private _fireStore:FirestoreService,private _sanitizer: DomSanitizer) { }
 
  ngOnInit() {
    this.currentProject=JSON.parse(localStorage.getItem('project'));    
    this._fireStore.getCurrentProject()
    .subscribe((project)=>{
      if(project){
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
        this._fireStore.getCurrentDonation()
        .subscribe((donation)=>{
          if(donation){
            this.donation=donation;
            console.log(this.donation);
            this.currentCategory=this.project.categories.filter(cat => cat.id === this.donation.category);
            console.log(this.donation.category);
          }
          else
          this.donation={name:'',category:''};                    
        });
      }else{ 
        this.project.category1Total=0; 
        this.project.category2Total=0;
        this.project.category3Total=0;
        this.project.category4Total=0;
      }      
    });    
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
}
