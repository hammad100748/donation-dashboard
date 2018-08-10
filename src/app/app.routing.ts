import { Routes, RouterModule } from '@angular/router'; import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { ScreenOneComponent } from './components/screen-one/screen-one.component';
import { ScreenTwoComponent } from './components/screen-two/screen-two.component';
import { ScreenThreeComponent } from './components/screen-three/screen-three.component';
import { CategoryScreenOneComponent } from './components/category-screen-one/category-screen-one.component';
import { CategoryScreenTwoComponent } from './components/category-screen-two/category-screen-two.component';
import { FinishProjectComponent } from './components/finish-project/finish-project.component';
import { HomeComponent } from './components/home/home.component';
import { DonationsComponent } from './components/donations/donations.component';
import { ScreenTwoWithoutSumComponent } from './components/screen-two-without-sum/screen-two-without-sum.component';
import { ScreenTwoSumComponent } from './components/screen-two-sum/screen-two-sum.component';


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create-project', component: CreateProjectComponent },
    { path: 'data-entry', component: DataEntryComponent },
    { path: 'data-entry/:id', component: DataEntryComponent },
    { path: 'screen-one', component: ScreenOneComponent },
    { path: 'screen-two', component: ScreenTwoComponent },
    { path: 'screen-three', component: ScreenThreeComponent },
    { path: 'category-screen-one', component: CategoryScreenOneComponent },
    { path: 'category-screen-two', component: CategoryScreenTwoComponent },
    { path: 'finish-project', component: FinishProjectComponent },
    { path: 'donations', component: DonationsComponent },
    { path: 'screen-two-no-sum', component: ScreenTwoWithoutSumComponent },
    { path: 'screen-two-sum', component: ScreenTwoSumComponent },
];


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
