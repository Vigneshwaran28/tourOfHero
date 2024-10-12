import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeroListComponent } from './home/hero-list/hero-list.component';
import { AddHeroComponent } from './home/add-hero/add-hero.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';  
import { MessageService } from 'primeng/api'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CandidateComponent } from './home/candidate/candidate.component';
import { ConfirmationService } from 'primeng/api'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule, } from 'primeng/card';
import { RegisterComponent } from './home/register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MenuModule } from 'primeng/menu';
const routes: Routes = [
  { path: 'home', component: HomeComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'candidate', component: CandidateComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    HeroListComponent,
    AddHeroComponent,
    CandidateComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forRoot(routes), // Use forRoot for the main routing configuration
    HttpClientModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MessagesModule,
    BrowserAnimationsModule,
    CardModule,
    Ng2SearchPipeModule,
    MenuModule,
  ],
  providers: [
    MessageService, // Provide MessageService
    ConfirmationService // Provide ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
