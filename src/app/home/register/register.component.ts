import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public username:string ='';
  public password:string='';
  public password1:string ='';
  public loginError:string ='';
  constructor(private mainService:MainService, private router:Router) { }

  ngOnInit(): void {
  }


  signUp(){
    if(this.password === this.password1){
      this.mainService.signUp(this.username,this.password).subscribe(
        response =>{
          console.log("New user created successfully", response)
          this.router.navigate(['login'])
        },
        error =>{
          console.error("Error occured", error)
        }
      )

    }
}
}
