import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
 
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  HEROES: any;
  i=0;
  selectedHero: { id: number; name: string; imageUrl: string } | null = null;
  dashboard = false;
  addName = false;
  nameList = true;
  addNameList = false;
  heroEditDiv: boolean = false;      // Edit modal visibility
  public alertModal = false;          // Alert modal visibility
  public visible: boolean = false;    // Delete modal visibility
  isGuest: boolean = false; // Set this based on the user's role,
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.heroListApi();  // Fetch heroes on initialization
    this.isGuest = localStorage.getItem('guest') === 'true';
  }

  // Select a hero for editing
  onSelect(hero: { id: number; name: string; imageUrl: string }): void {
    this.selectedHero = { ...hero }; // Create a copy of the hero object
    this.dashboard = false;
    this.heroEditDiv = true; // Show the edit modal
  }

  // Toggle visibility of edit modal
  heroEdit(hero: { id: number; name: string; imageUrl: string }) {
    this.selectedHero = { ...hero };
    this.heroEditDiv = true;
    console.log("Hero edit called")
  }

  // Go back to the hero list
  backToList() {
    this.addNameList = false;
    this.nameList = true;
    this.selectedHero = null;
    this.heroEditDiv = false; // Close edit modal
  }

  // Delete selected hero
  removeName(selectedHero: any): void {
    this.mainService.deleteHero(selectedHero.id).subscribe(
      response => {
        console.log('Hero deleted successfully');
        this.heroListApi(); // Refresh the list after delete
      },
      error => {
        console.error('Failed to delete hero', error);
      }
    );
    this.selectedHero = null;
    this.dashboard = true;
    this.visible = false;
  }

  // Show delete confirmation modal
  alertModelDispaly(selectedHero: any) {
    this.visible = true; // Show the modal
    this.heroEditDiv = false
    this.selectedHero = selectedHero; // Set the selected hero
    console.log('from delete button');
  }

  // Close the delete modal
  closeModal(selectedHero: any) {
    this.visible = false;
    return selectedHero;
  }

  // Get the hero list from the API
  heroListApi() {
    this.mainService.heroListApi().subscribe(
      response => {
        this.HEROES = response;
      },
      error => {
        console.error('Failed to fetch hero list', error);
      }
    );
  }


  // Save (update) selected hero
  onSave(selectedHero: any): void {
    this.mainService.editList(selectedHero.id, selectedHero).subscribe(
      response => {
        console.log('Hero updated successfully', response);
        this.heroListApi(); // Refresh the list after update
      },
      error => {
        console.error('Failed to update hero', error);
      }
    );
    this.selectedHero = null; // Clear selected hero after saving
    this.heroEditDiv = false; // Close edit modal
  }


  //back to dash
  backToDash() {
    this.heroEditDiv = false; // Close edit modal
  }
}
