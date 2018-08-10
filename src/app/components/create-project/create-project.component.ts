import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  project:Project={
    name:'',
    backgroundUrl:'',
    categories:[],
    currency:'₪',
    totalDonation:null,
    category1Total:null,
    category2Total:null,
    category3Total:null,
    category4Total:null,
  };
  constructor(private _fireStore:FirestoreService,
              private _router:Router,private spinnerService: Ng4LoadingSpinnerService,
              private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.spinnerService.hide();
    if (!localStorage.getItem('user')) {
      this._router.navigate(['/']);      
    }
  }
  url:any=null;
  onFileSelected(event){
  var reader = new FileReader();

  reader.onload = (event:any) => {
    this.url = event.target.result;    
  }
  reader.readAsDataURL(event.target.files[0]);
  }
  error=false;
  startProject(values){
    if(this.url==null){
      this.error=true;
      return;
    }
    this.error=false;
    this.project.name=values.project_name;      
    this.project.backgroundUrl=this.url;    
    if(values.cat_1!='')
    this.project.categories.push({id:'1',value:values.cat_1});
    if(values.cat_2!='')
    this.project.categories.push({id:'2',value:values.cat_2});
    if(values.cat_3!='')
    this.project.categories.push({id:'3',value:values.cat_3});
    if(values.cat_4!='')
    this.project.categories.push({id:'4',value:values.cat_4}); 
    const createdAt = new Date();
    this.project.createdAt = createdAt;   
    this.spinnerService.show();  
    this._fireStore.addProject(this.project)
    .then((docRef)=>{
      this.project.id=docRef.id;
      this.assignCurrentProject(this.project);      
    }).catch((err)=>{
      console.log(err);
    });
  }

  assignCurrentProject(project:Project){
    this._fireStore.updateCurrentProject(project).then(docRef=>{
      this._flashMessagesService.show('New Project Started!', { cssClass: 'alert-success', timeout: 5000 });            
      this._router.navigate([`/data-entry`]);
    });
  }
}