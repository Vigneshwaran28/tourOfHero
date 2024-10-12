import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private mainService :MainService, private router: Router){}
  
  canActivate(): boolean {
    if (this.mainService.isLoggedIn()) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
}
 }

