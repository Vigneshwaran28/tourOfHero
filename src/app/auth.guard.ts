// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private mainService: MainService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.mainService.isLoggedIn();  // Check if the user is logged in
    const isGuest = localStorage.getItem('guest') === 'true';  // Check if the user is a guest

    // If the user is either logged in or a guest, allow navigation
    if (isLoggedIn || isGuest) {
      return true;
    } else {
      // If the user is not logged in or a guest, redirect to login page
      this.router.navigate(['login']);
      return false;
    }
  }
}
