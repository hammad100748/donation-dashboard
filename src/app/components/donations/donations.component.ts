import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';
import { SearchByNamePipe } from '../../pipes/search-by-name.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  constructor(private _fireStore: FirestoreService,
    private _flashMessagesService: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private _router: Router) { }
  projectId;
  showEditableTable: boolean = false;
  editRowId: any = '';
  isAddRow: boolean = false;
  allDonations: Donation[];
  project: Project;
  public searchNameString: string;
  categories;
  ngOnInit() {
    this._fireStore.getCurrentProject().subscribe(project => {
      this.project = project;
      this.categories = this.project.categories;
      this.getDonations(this.project.id);
    });
  }

  getDonations(projectId) {
    this._fireStore.getAllDonations(projectId)
      .subscribe((donations) => {
        this.allDonations = donations;
      });
  }
  temp_amount = null;
  temp_category = '';
  editRow(coin_id, amount, category) {
    this.editRowId = coin_id;
    this.temp_amount = amount;
    this.temp_category = category;    
  }

  updateRow(new_donation: Donation) {
    this.spinnerService.show();
    // Updating Current Display Project
    this.project.totalDonation -= this.temp_amount;
    this.project.totalDonation += new_donation.amount;

    
    if (new_donation.category == '1')
      this.project.category1Total += 1;
    else if (new_donation.category == '2')
      this.project.category2Total += 1;
    else if (new_donation.category == '3')
      this.project.category3Total += 1;
    else if (new_donation.category == '4')
      this.project.category4Total += 1;

    if (this.temp_category == '1')
      this.project.category1Total -= 1;
    else if (this.temp_category == '2')
      this.project.category2Total -= 1;
    else if (this.temp_category == '3')
      this.project.category3Total -= 1;
    else if (this.temp_category == '4')
      this.project.category4Total -= 1;
      
      console.log('Now');
      console.log('Cat1'+this.project.category1Total);
      console.log('Cat2'+this.project.category2Total);
      console.log('Cat3'+this.project.category3Total);
      console.log('Cat4'+this.project.category4Total);

    this._fireStore.updateCurrentDisplayProject(this.project)
      .then(res => {

      });
    // Updating Current Display Donation
    this._fireStore.updateCurrentDisplayDonation(new_donation)
      .then((donation) => {
      });
    // Update Donation In Project
    this._fireStore.updateDonation(this.project.id, new_donation)
      .then((cur_donation) => {
      });
     // Update Original Project  
    this._fireStore.updateProject(this.project).then(() => {
      this.spinnerService.hide();
      this.editRowId = '';
      this.temp_amount = '';
      this.temp_category='';
      this._flashMessagesService.show('Donation Updated!', { cssClass: 'alert-info' });
    });

  }

  deleteRow(donation_id, cat_id, amount) {
    this.spinnerService.show();
    this._fireStore.deleteDonation(this.project.id, donation_id);
    this._fireStore.removeCurrentDonation();
    if (cat_id == '1')
      this.project.category1Total -= 1;
    else if (cat_id == '2')
      this.project.category2Total -= 1;
    else if (cat_id == '3')
      this.project.category3Total -= 1;
    else if (cat_id == '4')
      this.project.category4Total -= 1;

    this.project.totalDonation -= parseInt(amount);

    this._fireStore.updateCurrentDisplayProject(this.project)
      .then(() => {
      });

    this._fireStore.updateProject(this.project).then(() => {
      this._flashMessagesService.show('Donation Deleted!', { cssClass: 'alert-warning' });
      this.allDonations = this.allDonations.filter((donation: Donation) => donation.id !== donation_id);
      this.spinnerService.hide();
    });
  }

  filterCategory(currentCategoryId) {
    let cat = this.categories.filter(t => t.id == currentCategoryId);
    return cat[0].value;
  }

  _keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
