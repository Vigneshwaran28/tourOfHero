import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MainService } from 'src/app/main.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx'; // Import XLSX
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  public candidateDialog: boolean = false;
  public candidates: any[] = [];
  public candidate: any = {};
  public selectedCandidates: any[] = [];
  public submitted: boolean = false;
  public visible: boolean = false; // For showing the modal

  // Education dropdown options
  public education = [
    { name: 'Diploma', code: 'DIP' },
    { name: '10th Grade', code: '10' },
    { name: '12th Grade', code: '12' },
    { name: 'Undergraduate', code: 'UG' },
    { name: 'Postgraduate', code: 'PG' },
    { name: 'MCA', code: 'MCA' },
    { name: 'MSc', code: 'MSC' },
    { name: 'MBA', code: 'MBA' },
    { name: 'MA', code: 'MA' },
    { name: 'B.Tech', code: 'BTECH' },
    { name: 'M.Tech', code: 'MTECH' },
    { name: 'B.Sc', code: 'BSC' },
    { name: 'BA', code: 'BA' },
    { name: 'BCA', code: 'BCA' },
    { name: 'M.Sc (IT)', code: 'MSCIT' },
    { name: 'B.Com', code: 'BCOM' },
    { name: 'M.Com', code: 'MCOM' },
    { name: 'PhD', code: 'PHD' },
    { name: 'D.Ed', code: 'DED' },
    { name: 'B.Ed', code: 'BED' },
    { name: 'LLB', code: 'LLB' },
    { name: 'LLM', code: 'LLM' },
    { name: 'CMA', code: 'CMA' },
    { name: 'CA', code: 'CA' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private mainService: MainService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCandidate();
  }
 

  // Open the candidate dialog
  openNew() {
    if (this.isLoggedIn()) {
      this.candidate = {};
      this.submitted = false;
      this.candidateDialog = true;
    } else {
      this.visible = true; // Show the login modal if the user is not logged in
    }
  }

  // Get the candidate details
  getCandidate() {
    this.mainService.getCandidates().subscribe(
      (data) => {
        this.candidates = data;
      },
      (error) => console.log('Error: ', error)
    );
  }

  // Edit the existing candidate
  editCandidate(candidate: any) {
    if (this.isLoggedIn()) {
      this.candidate = { ...candidate };
      this.candidateDialog = true;
    } else {
      this.visible = true; // Show the login modal
    }
  }

  // Delete the selected candidate
  deleteCandidate(candidate: any) {
    if (this.isLoggedIn()) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${candidate.name}?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.mainService.deleteCandidate(candidate.id).subscribe(
            (response) => {
              this.candidates = this.candidates.filter((c) => c.id !== candidate.id);
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Candidate Deleted',
                life: 3000,
              });
            },
            (error) => {
              console.error(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Unsuccessful',
                detail: 'Candidate Not Deleted',
                life: 3000,
              });
            }
          );
        },
      });
    } else {
      this.visible = true; // Show the login modal
    }
  }

  // Hide the add candidate dialog box
  hideDialog() {
    this.candidateDialog = false;
    this.submitted = false;
  }

  // Save the candidate
  saveCandidate() {
    this.submitted = true;
    this.candidate.dob = formatDate(this.candidate.dob, 'yyyy-MM-dd', 'en-US');
    this.candidate.qualification = this.candidate.qualification.name;

    if (this.candidate.name.trim()) {
      if (this.candidate.id) {
        this.mainService.updateCandidate(this.candidate).subscribe(
          (response) => {
            const index = this.findIndexById(this.candidate.id);
            if (index !== -1) {
              this.candidates[index] = response;
              this.candidates = [...this.candidates];
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: `Candidate ${this.candidate.name} Updated`,
              life: 3000,
            });
            this.candidateDialog = false;
            this.candidate = {};
          },
          (error) => {
            console.error('Error occurred:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Unsuccessful',
              detail: 'Candidate Not Updated',
              life: 3000,
            });
          }
        );
      }
    }
  }

  // Check if the user is logged in (you can adjust this based on your authentication logic)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists in localStorage
  }

  // Handle login action
  login() {
    // Logic to handle login goes here
    this.router.navigate(['login']);
    this.mainService.logoutService();
    console.log('Redirect to login page');
  }

  // Find index by id for updating the candidate list
  findIndexById(id: number): number {
    return this.candidates.findIndex((candidate) => candidate.id === id);
  }

    // convert the candidate details into excel sheet
    exportToExcel() {
      // Create a new workbook
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.candidates);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Candidates');
  
      // Generate a file and prompt the user to download it
      XLSX.writeFile(wb, 'candidates.xlsx');
    }
}
