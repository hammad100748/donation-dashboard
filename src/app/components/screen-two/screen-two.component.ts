import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirestoreService } from '../../services/firestore.service';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  constructor(private _fireStore: FirestoreService, private _sanitizer: DomSanitizer) { }
  donation: Donation = {
    name: '',
    amount: 0
  };
  project: Project;
  category1Donations: Donation[];
  category2Donations: Donation[];
  category3Donations: Donation[];
  category4Donations: Donation[];
  numCat;
  ngOnInit() {
    this._fireStore.getCurrentDonation()
      .subscribe((donation) => {
        if (donation)
          this.donation = donation;
      });
    this._fireStore.getCurrentProject()
      .subscribe((project) => {
        this.project = project;
        this.getCategories();
        if (this.project.categories.length === 3) {
          this.numCat = 4;
        } else if (this.project.categories.length === 4) {
          this.numCat = 3;
        } else if (this.project.categories.length === 2) {
          this.numCat = 6;
        } else {
          this.numCat = 12;
        }
      });
  }

  getCategories() {
    this._fireStore.getCategoryDonations(this.project.id, '1').subscribe((donations) => {
      this.category1Donations = donations;
    });
    this._fireStore.getCategoryDonations(this.project.id, '2').subscribe((donations) => {
      this.category2Donations = donations;
    });
    this._fireStore.getCategoryDonations(this.project.id, '3').subscribe((donations) => {
      this.category3Donations = donations;
    });
    this._fireStore.getCategoryDonations(this.project.id, '4').subscribe((donations) => {
      this.category4Donations = donations;
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

}
