import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';


@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public canvasBar = false;   // showthe canvasBar
  public activeLink: string = 'dashboard'; // Active link status
  public heroApiList:any;  // get the values fromt the api
  public isAdmin: boolean = false; // show the addHero in navbar
  constructor(private router: Router, private mainService:MainService) { }

  ngOnInit(){
    const admin = localStorage.getItem('is_staff');
    this.isAdmin = admin === '1' || admin === 'true'; 
    console.log(typeof(this.isAdmin))
    console.log(this.isAdmin)
    console.log(admin)
  }

  // Function to set the active link
  setActiveLink(linkName: string) {
    this.activeLink = linkName;
    this.canvasBar = false;
  }

  // Toggle the visibility of the sidebar
  toggleNavbar() {
    this.canvasBar = false;
  }

  // Function to navigate to home/dashboard
  dashBoard_function() {
    this.router.navigate(['home']);
    this.toggleNavbar(); // Close sidebar after navigating
  }

  // Function to navigate to Hero List
  heroList() {
    this.router.navigate(['heroList']);
    this.toggleNavbar(); // Close sidebar after navigating
  }

  // Function to sign out
  signOut() {
    this.mainService.logoutService()
    this.toggleNavbar();
  }


}
