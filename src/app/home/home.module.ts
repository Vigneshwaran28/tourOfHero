import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HeroListComponent } from './hero-list/hero-list.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { RegisterComponent } from './register/register.component';
import { CandidateComponent } from './candidate/candidate.component';
import { HttpClientModule } from '@angular/common/http';



const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path:'heroList',component:HeroListComponent },
      { path:'addHero', component:AddHeroComponent },
      { path: 'candidate', component:CandidateComponent }
  ]}
];


@NgModule({
  declarations: [     
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
    HttpClientModule,
  ]
})
export class HomeModule { }
