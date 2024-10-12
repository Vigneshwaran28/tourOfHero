import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { CanActivate, Router } from '@angular/router';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, CanActivate {

  public titles = 'Tour of Heros';
  public dashboard = true;
  public heroList = false;
  public AddName = false;
  public heroName = '';
  public heroImage = '';
  public heroDescription = '';
  public HEROES: any[] = [];  // Storing the list of heroes
  public filteredHeroes: any[] = []; // Storing the filtered list
  public heroId = '';
  public preview = false;
  public alertModal = false;
  public visible: boolean = false;
  public isFullDescription: boolean = false;
  public selectedHero: {
description: any; id: number; name: string; imageUrl: string 
} | null = null;
  public id: number | undefined;
  public search: string = '';  // Search input bound variable
  public items: MenuItem[]=[];

  
  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {
    this.heroListApi();
 
    this.items = [{
      label: 'Name',
      items: [{
          label: 'Ascending',
          icon: 'pi pi-sort-alpha-down',
          command: () => {
            this.filteredHeroes = this.HEROES
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); 
          }
      },
      {
          label: 'Descending',
          icon: 'pi pi-sort-alpha-down-alt',
          command: () => {
            this.filteredHeroes = this.HEROES
            .sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
          }
      }
      ]},
      {
          label: 'Description',
          items: [{
              label: 'Ascending',
              icon: 'pi pi-sort-amount-down',
              command: () => {//Ascending functinality
                this.filteredHeroes = this.HEROES
                .sort((a, b) => a.description.toLowerCase().localeCompare(b.name.toLowerCase())); 
              }
          },
          {
              label: 'Descending',
              icon: 'pi pi-sort-amount-down-alt',
              command: () => { // descending functionality
                this.filteredHeroes = this.HEROES
                .sort((a, b) => b.description.toLowerCase().localeCompare(a.name.toLowerCase()));
              }
          }
      ]},
  ];
}

  
  onSelect(hero: { id: number; name: string; imageUrl: string ,description:string}): void {
    this.selectedHero = { ...hero };
    this.dashboard = false;
  }

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  backToDash() {
    this.dashboard = true;
    this.selectedHero = null;
  }

  closeModal(selectedHero: any) {
    this.visible = false;
    return selectedHero;
  }

  heroListApi() {
    this.mainService.heroListApi().subscribe(
      response => {
        this.HEROES = response;
        this.filteredHeroes = response; // Initialize filteredHeroes with the complete list
      },
      error => {
        console.error('Failed to fetch hero list', error);
      }
    );
  }

  onSave(selectedHero: any): void {
    this.mainService.editList(selectedHero.id, selectedHero).subscribe(
      response => {
        console.log('Hero updated successfully', response);
        this.heroListApi();  // Refresh the list after update
      },
      error => {
        console.error('Failed to update hero', error);
      }
    );
    this.selectedHero = null;
    this.dashboard = true;
  }

  removeName(selectedHero: any): void {
    this.mainService.deleteHero(selectedHero.id).subscribe(
      response => {
        console.log('Hero deleted successfully');
        this.heroListApi();  // Refresh the list after delete
      },
      error => {
        console.error('Failed to delete hero', error);
      }
    );
    this.selectedHero = null;
    this.dashboard = true;
    this.visible = false;
  }

  alertModelDispaly(selectedHero: any) {
    this.selectedHero = selectedHero;
    this.visible = true;
  }

  // Method to handle search input change
  onSearchTextChanged(): void {
    this.filteredHeroes = this.HEROES.filter(hero =>
      hero.name.toLowerCase().includes(this.search.toLowerCase())  // Case-insensitive search
    );
  }
}
