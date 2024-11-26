import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public canvasBar = false;   // To toggle the canvasBar (sidebar)
  public activeLink: string = 'dashboard'; // Active link status
  public isAdmin: boolean = false; // Flag to show the 'Add Hero' in navbar
  public isGuest: boolean = false; // Flag to check if the user is a guest
  public heroApiList: any;  // Store the values from the API

  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
    // Check if the user is logged in as an admin or a guest
    const admin = localStorage.getItem('is_staff');
    const guest = localStorage.getItem('guest');  // Check guest login status

    this.isAdmin = admin === '1' || admin === 'true';
      // Check if the user is logged in as a guest (set by loginAsGuest method)
      this.isGuest = guest === 'true';  // A method to track guest login// If guest status is stored as 'true', the user is a guest

    console.log('Admin:', this.isAdmin);
    console.log('Guest:', this.isGuest);
  }

  // Function to set the active link in the navbar
  setActiveLink(linkName: string) {
    this.activeLink = linkName;
    this.canvasBar = false;  // Close sidebar after setting active link
  }

  // Toggle the visibility of the sidebar (canvasBar)
  toggleNavbar() {
    this.canvasBar = !this.canvasBar;
  }

  // Function to navigate to the dashboard
  dashBoard_function() {
    this.router.navigate(['home']);
    this.toggleNavbar(); // Close sidebar after navigating
  }

  // Function to navigate to the Hero List
  heroList() {
    this.router.navigate(['heroList']);
    this.toggleNavbar(); // Close sidebar after navigating
  }

  // Function to sign out
  signOut() {
    this.mainService.logoutService();  // Call the logout service
    this.isGuest = false;  // Reset guest status on sign out
    this.router.navigate(['login']);  // Ensure the navigation occurs to the login page
    this.toggleNavbar();  // Optionally toggle the navbar if needed
  }

  // Function to check if the user is logged in as a guest
  checkIfGuest() {
    return this.isGuest;
  }
}
