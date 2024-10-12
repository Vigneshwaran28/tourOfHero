import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MainService } from 'src/app/main.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx'; // Import XLSX


@Component({
  selector: 'app-root',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})


export class CandidateComponent implements OnInit {
  public candidateDialog: boolean = false;
  public candidates: any[] = []; // Replace `Candidate[]` with `any[]`
  public candidate: any = {}; // Replace `Candidate` with `any`
  public selectedCandidates: any[] = []; // Replace `Candidate[]` with `any[]`
  public submitted: boolean = false; // show the error message if the username is not entered
  public education = [       // dropdown for education section
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
    private mainService: MainService
  ) {}


  ngOnInit() {
    this.getCandidate();
  }
  // open the candidate dialogue
  openNew() {
    this.candidate = {};
    this.submitted = false;
    this.candidateDialog = true;
  }

  // get the cadidate details
  getCandidate() {
    this.mainService.getCandidates().subscribe(
      (data) => {
        this.candidates = data;
      },
      (error) => console.log('Error. :|', error)
    );
  }

  //edit the existing candidate
  editCandidate(candidate: any) {
    this.candidate = { ...candidate };
    this.candidateDialog = true;
  }



  // delete the selected candidate
  deleteCandidate(candidate: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${candidate.name}?</strong>?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.deleteCandidate(candidate.id).subscribe(
          (response) => {
            // Remove the deleted candidate from the candidates array
            this.candidates = this.candidates.filter(
              (c) => c.id !== candidate.id
            );
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
              detail: 'Candidate not Deleted',
              life: 3000,
            });
          }
        );
      },
    });
  }


  // hide the add candidate dialog box
  hideDialog() {
    this.candidateDialog = false;
    this.submitted = false;
  }

  // save the candidate
  saveCandidate() {
    this.submitted = true;

    // Ensure date and qualification formatting
    this.candidate.dob = formatDate(this.candidate.dob, 'yyyy-MM-dd', 'en-US');
    this.candidate.qualification = this.candidate.qualification.name;

    if (this.candidate.name.trim()) {
      if (this.candidate.id) {
        // Update existing candidate
        this.mainService.updateCandidate(this.candidate).subscribe(
          (response) => {
            const index = this.findIndexById(this.candidate.id);
            if (index !== -1) {
              // Update the candidate in the list directly
              this.candidates[index] = response;
              this.candidates = [...this.candidates]; // Trigger change detection
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: `Candidate ${this.candidate.name} Updated`,
              life: 3000,
            });
            this.candidateDialog = false;
            this.candidate = {}; // Reset candidate form
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
      } else {
        // Create new candidate
        this.mainService.createCandidate(this.candidate).subscribe(
          (response) => {
            this.candidates.push(response); // Add new candidate to the list
            this.candidates = [...this.candidates]; // Trigger change detection
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Candidate Created',
              life: 3000,
            });
            this.candidateDialog = false;
            this.candidate = {}; // Reset form
          },
          (error) => {
            console.error('Error occurred:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Unsuccessful',
              detail: 'Candidate Not Created',
              life: 3000,
            });
          }
        );
      }
    }
  }

  // find the index id for the candidate
  findIndexById(id: string): number {
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
