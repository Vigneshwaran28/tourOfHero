import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'TourOfHeros';
  msg : any;
  // constructor for router
  public constructor(private router:Router){} 


  // ngOnInit service - life cycle of hooks
  ngOnInit(){
    this.router.navigate(['login'])

  }
}
