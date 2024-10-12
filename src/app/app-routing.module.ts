import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroListComponent } from './home/hero-list/hero-list.component';
import { AddHeroComponent } from './home/add-hero/add-hero.component';
import { AuthGuard } from './auth.guard';  // Import the AuthGuard
import { CandidateComponent } from './home/candidate/candidate.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],  // Protect home and its child routes with AuthGuard
    children: [
      { path: '', redirectTo: "dashboard", pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'heroList', component: HeroListComponent },
      { path: 'addHero', component: AddHeroComponent },
      { path: 'candidate', component:CandidateComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent,pathMatch:'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
