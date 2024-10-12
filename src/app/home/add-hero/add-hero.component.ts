import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
public heroImage: any;  // store the hero image
public heroName: any;   // store the hero name
public HEROES:any;      // store the hero in the array format
public heroDescription:string='';
// constructor for initializing this
  constructor( private mainService: MainService, private router: Router ) { }

  // life cycle hooks of init - start
  ngOnInit(): void {
    this.HEROES = this.mainService.getHeros()
    console.log(typeof(this.HEROES))
  }

// add the new name and image into the DB
  addName(): void {
    const heroName = this.heroName;
    const heroImage = this.heroImage;
    const heroDescription = this.heroDescription;
  
    // Ensure that both values are correctly assigned before sending
    if (!heroName || !heroImage) {
      console.error("Hero name and image are required");
      return;
    }
  
    this.mainService.addListName(heroName, heroImage,heroDescription).subscribe(
      response => {
        console.log("Hero added successfully:", response);
        this.router.navigate(['home']);
      },
      error => {
        console.error("Error occurred:", error);
      }
    );
    console.log(heroName, heroImage,heroDescription);
  }
  
  // close the add list then return to home
  close() {
    return this.router.navigate(['home'])
  }
}
